import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { HourHandEntity } from 'src/models/hour-hand/HourHand.entity';
import { HourEntity } from 'src/models/hour/Hour.entity';
import { Between, Repository } from 'typeorm';
import { CreateHourDto } from './dtos/create-hour.dto';
import { EditHourDto } from './dtos/edit-hour.dto';

@Injectable()
export class HourService {
    constructor(
        @InjectRepository(HourEntity) private hourRepository: Repository<HourEntity>,
        @InjectRepository(HourHandEntity) private hourHandRepository: Repository<HourHandEntity>,
    ){}

    public async getHours(paginationQuery:PaginationQuery):Promise<HourEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.hourRepository.find({
                    skip,
                    take:limit
                });
            case DATE:
                return await this.hourRepository.find({
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
                return await this.hourRepository.find({
                    skip,
                    take:limit
                });
        }
    } 

    public async getHour(id: number):Promise<HourEntity>{

        const hourEnt = await this.hourRepository.findOne(id);
    
        if (!hourEnt)throw new NotFoundException('no se encontro la hora');
    
        return hourEnt;
    }

    public async createHour({
        entryTomorrow,
        departureTomorrow,
        lateEntry,
        lateCheckOut,
        entryTomorrowLimitInitial,
        entryTomorrowLimitFinal,
        departureTomorrowLimitInitial,
        departureTomorrowLimitFinal,
        lateEntryLimitInitial,
        lateEntryLimitFinal,
        lateCheckOutLimitInitial,
        lateCheckOutLimitFinal,
        dischargeDate,
        hourHandId
    }: CreateHourDto):Promise<HourEntity>{

        const hourHandExist: HourHandEntity = await this.hourHandRepository.findOne({ id:hourHandId });
        if(!hourHandExist)throw new BadRequestException('El horario para asociar no existe');

        const newhour: HourEntity = new HourEntity();
        newhour.hourHand=hourHandExist;
        newhour.entryTomorrow=entryTomorrow;
        newhour.departureTomorrow=departureTomorrow;
        newhour.lateEntry=lateEntry;
        newhour.lateCheckOut=lateCheckOut;
        newhour.entryTomorrowLimitInitial=entryTomorrowLimitInitial;
        newhour.entryTomorrowLimitFinal=entryTomorrowLimitFinal;
        newhour.departureTomorrowLimitInitial=departureTomorrowLimitInitial;
        newhour.departureTomorrowLimitFinal=departureTomorrowLimitFinal;
        newhour.lateEntryLimitInitial=lateEntryLimitInitial;
        newhour.lateEntryLimitFinal=lateEntryLimitFinal;
        newhour.lateCheckOutLimitInitial=lateCheckOutLimitInitial;
        newhour.lateCheckOutLimitFinal=lateCheckOutLimitFinal;
        newhour.dischargeDate=dischargeDate;
        newhour.enabled=true;

        return await this.hourRepository.save(newhour);
    }

    public async editHour(id: number, dto: EditHourDto):Promise<HourEntity> {
        const hourEnt = await this.getHour(id);

        if(!hourEnt)throw new NotFoundException('no se encontro la hora');

        const editHour = Object.assign(hourEnt, dto);

        const result=await this.hourRepository.save(editHour);
        return result;
    }
}
