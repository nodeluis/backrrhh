import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { TypeAfiliationEntity } from 'src/models/type-afiliation/TypeAfiliation.entity';
import { TypeEmployeeEntity } from 'src/models/type-employee/TypeEmployee.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateTypeEmployeeDto } from './dtos/create-type-employee.dto';
import { EditTypeEmployeeDto } from './dtos/edit-type-employee.dto';

@Injectable()
export class TypeEmployeeService {
    constructor(
        @InjectRepository(TypeAfiliationEntity) private afiliationRepository: Repository<TypeAfiliationEntity>,
        @InjectRepository(TypeEmployeeEntity) private typeEmployeeRepository: Repository<TypeEmployeeEntity>,
    ){}

    public async getTypeEmployees(paginationQuery:PaginationQuery):Promise<TypeEmployeeEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.typeEmployeeRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.typeEmployeeRepository.find({
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
                return await this.typeEmployeeRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getTypeEmployee(id: number):Promise<TypeEmployeeEntity>{

        const emEnt = await this.typeEmployeeRepository.findOne(id);
    
        if (!emEnt)throw new NotFoundException('No se encontro el tipo de empleado');
    
        return emEnt;
    }

    public async createTypeEmployee(dto: CreateTypeEmployeeDto):Promise<TypeEmployeeEntity>{

        const taExist: TypeAfiliationEntity = await this.afiliationRepository.findOne({ id:dto.typeAfiliationId });
        if(!taExist)throw new BadRequestException('No existe el tipo de afiliación');

        const teExist: TypeEmployeeEntity = await this.typeEmployeeRepository.findOne({ name:dto.name });
        if(teExist)throw new BadRequestException('El tipo de empleado ya existe');

        const newTe: TypeEmployeeEntity = new TypeEmployeeEntity();
        newTe.typeAfiliation=taExist;
        newTe.name=dto.name;

        return this.typeEmployeeRepository.save(newTe);

    }

    public async editTypeEmployee(id: number, dto: EditTypeEmployeeDto):Promise<TypeEmployeeEntity> {
        
        const teEnt: TypeEmployeeEntity = await this.getTypeEmployee(id);

        const editedTe: TypeEmployeeEntity = Object.assign(teEnt, dto);

        const result=await this.typeEmployeeRepository.save(editedTe);
        
        return result;
    }
}
