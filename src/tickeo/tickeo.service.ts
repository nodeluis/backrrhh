import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';
import { HourEntity } from 'src/models/hour/Hour.entity';
import { ReasonEntity } from 'src/models/reason/Reason.entity';
import { TickeoEntity } from 'src/models/tickeo/Tickeo.entity';
import { Between, Repository } from 'typeorm';
import { CreateTickeoDto } from './dtos/create-tickeo.dto';
import { EditTickeoDto } from './dtos/edit-tickeo.dto';

@Injectable()
export class TickeoService {
    constructor(
        @InjectRepository(TickeoEntity) private tickeoRepository: Repository<TickeoEntity>,
        @InjectRepository(HourEntity) private hourRepository: Repository<HourEntity>,
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
    ){}

    public async getTickeos(paginationQuery:PaginationQuery):Promise<TickeoEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.tickeoRepository.find({
                    skip,
                    take:limit
                });
            case DATE:
                return await this.tickeoRepository.find({
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
                return await this.tickeoRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getTickeo(id: number):Promise<TickeoEntity>{

        const reasonEnt = await this.tickeoRepository.findOne(id);
    
        if (!reasonEnt)throw new NotFoundException('No se encontro el tickeo');
    
        return reasonEnt;
    }

    public async createTickeo(dto: CreateTickeoDto):Promise<TickeoEntity>{

        const hourEnt: HourEntity = await this.hourRepository.findOne({ id:dto.hourId });
        if(!hourEnt)throw new BadRequestException('La hora no existe');

        const empEnt: EmployeeEntity = await this.employeeRepository.findOne({ id:dto.employeeId });
        if(!empEnt)throw new BadRequestException('El empleado no existe no existe');

        const newTickeo: TickeoEntity = new TickeoEntity();
        newTickeo.employee=empEnt;
        newTickeo.hour=hourEnt;

        const tickeoAsign = Object.assign(newTickeo, dto);
        /*newTickeo.entryTimeTomorrow=dto.entryTimeTomorrow;
        newTickeo.departureTimeTomorrow=dto.departureTimeTomorrow;
        newTickeo.minutesLateTomorrow=dto.minutesLateTomorrow;
        newTickeo.lateEntryTime=dto.lateEntryTime;
        newTickeo.lateCheckOutTime=dto.lateCheckOutTime;
        newTickeo.minutesLateInAfternoon=dto.minutesLateInAfternoon;*/

        return await this.tickeoRepository.save(tickeoAsign);
    }

    public async editTickeo(id: number, dto: EditTickeoDto):Promise<TickeoEntity> {
        const tickeoEnt = await this.getTickeo(id);

        if(!tickeoEnt)throw new NotFoundException('No se encontro el tickeo');

        const reasonEd = Object.assign(tickeoEnt, dto);

        const result=await this.tickeoRepository.save(reasonEd);
        return result;
    }
}
