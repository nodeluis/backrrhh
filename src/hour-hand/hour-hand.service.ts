import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { HourHandEntity } from 'src/models/hour-hand/HourHand.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateHourHandDto } from './dtos/create-hour-hand.dto';
import { EditHourHandDto } from './dtos/edit-hour-hand.dto';

@Injectable()
export class HourHandService {
    constructor(
        @InjectRepository(HourHandEntity) private hourHandRepository: Repository<HourHandEntity>,
    ){}

    public async getHourHands(paginationQuery:PaginationQuery):Promise<HourHandEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.hourHandRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {type:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.hourHandRepository.find({
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
                return await this.hourHandRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getHourHand(id: number):Promise<HourHandEntity>{

        const houHandEnt = await this.hourHandRepository.findOne(id);
    
        if (!houHandEnt)throw new NotFoundException('no se encontro el horario');
    
        return houHandEnt;
    }

    public async createHourHand(dto: CreateHourHandDto):Promise<HourHandEntity>{

        const houHandExist: HourHandEntity = await this.hourHandRepository.findOne({ name:dto.name });
        if(houHandExist)throw new BadRequestException('El horario ya existe');

        const newhouHand: HourHandEntity = this.hourHandRepository.create(dto);

        return await this.hourHandRepository.save(newhouHand);
    }

    public async editHourHande(id: number, dto: EditHourHandDto):Promise<HourHandEntity> {
        const houHandEnt = await this.getHourHand(id);

        if(!houHandEnt)throw new NotFoundException('no se encontro el horario');

        const editHourHand = Object.assign(houHandEnt, dto);

        const result=await this.hourHandRepository.save(editHourHand);
        return result;
    }
}
