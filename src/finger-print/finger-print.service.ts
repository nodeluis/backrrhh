import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { saveFile, TypeSave } from 'src/common/saveImages/save';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';
import { FingerPrintEntity } from 'src/models/finger-print/FingerPrint.entity';
import { Between, Repository } from 'typeorm';
import { CreateFingerPrintDto } from './dtos/create-finger-print.dto';
import { EditFingerPrintDto } from './dtos/edit-finger-print.dto';

@Injectable()
export class FingerPrintService {

    constructor(
        @InjectRepository(FingerPrintEntity) private fingerRepository: Repository<FingerPrintEntity>,
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
    ){}

    public async getFingerPrints(paginationQuery:PaginationQuery):Promise<FingerPrintEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case DATE:
                return await this.fingerRepository.find({
                    where: [
                        {
                            createdAt: Between(
                                date1.toISOString(),
                                date2.toISOString(),
                            ),
                        }
                    ],
                    skip,
                    take:limit
                });
            case NONE:
                return await this.fingerRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getFingerPrint(id: number):Promise<FingerPrintEntity>{

        const fingerEnt = await this.fingerRepository.findOne(id);
    
        if (!fingerEnt)throw new NotFoundException('no se encontro el registro de huella');
    
        return fingerEnt;
    }

    public async createFingerPrint(dto: CreateFingerPrintDto):Promise<FingerPrintEntity>{

        const empEnt=await this.employeeRepository.findOne(dto.employeeId);
        if(!empEnt)throw new BadRequestException('no se encontró al empleado');

        const newFinger= new FingerPrintEntity();
        newFinger.employee=empEnt;
        newFinger.thumb=saveFile(dto.thumb,TypeSave.FINGER);
        newFinger.index=saveFile(dto.index,TypeSave.FINGER);
        newFinger.middle=saveFile(dto.middle,TypeSave.FINGER);
        newFinger.ring=saveFile(dto.ring,TypeSave.FINGER);
        newFinger.little=saveFile(dto.little,TypeSave.FINGER);
        newFinger.enabled=true;

        return await this.fingerRepository.save(newFinger);
    }

    public async editFingerPrint(id: number, dto: EditFingerPrintDto):Promise<FingerPrintEntity> {
        
        const fingerEnt = await this.getFingerPrint(id);

        if(dto.thumb){
            dto.thumb=saveFile(dto.thumb,TypeSave.EDIT_FINGER,fingerEnt.thumb);
        }
        if(dto.index){
            dto.index=saveFile(dto.index,TypeSave.EDIT_FINGER,fingerEnt.index);
        }
        if(dto.middle){
            dto.middle=saveFile(dto.middle,TypeSave.EDIT_FINGER,fingerEnt.middle);
        }
        if(dto.ring){
            dto.ring=saveFile(dto.ring,TypeSave.EDIT_FINGER,fingerEnt.ring);
        }
        if(dto.little){
            dto.little=saveFile(dto.little,TypeSave.EDIT_FINGER,fingerEnt.little);
        }

        const fingerEd = Object.assign(fingerEnt, dto);

        const result=await this.fingerRepository.save(fingerEd);
        return result;
    }

}
