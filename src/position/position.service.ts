import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { PositionEntity } from 'src/models/position/Position.entity';
import { UnitedEntity } from 'src/models/united/United.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreatePositionDto } from './dtos/create-position.dto';
import { EditPositionDto } from './dtos/edit-position.dto';

@Injectable()
export class PositionService {

    constructor(
        @InjectRepository(PositionEntity) private positionRepository: Repository<PositionEntity>,
        @InjectRepository(UnitedEntity) private unitedRepository: Repository<UnitedEntity>,
    ){}

    public async getPositions(paginationQuery:PaginationQuery):Promise<PositionEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.positionRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {description:Like(`%${search}%`)},
                        {requiredSkill:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.positionRepository.find({
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
                return await this.positionRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getPosition(id: number):Promise<PositionEntity>{

        const posEnt = await this.positionRepository.findOne(id);
    
        if (!posEnt)throw new NotFoundException('no se encontro el edificio');
    
        return posEnt;
    }

    public async createPosition(dto: CreatePositionDto):Promise<PositionEntity>{

        const unExist: UnitedEntity = await this.unitedRepository.findOne({ id:dto.unitedId });
        if(!unExist)throw new BadRequestException('No existe la unidad');


        const newPos: PositionEntity = new PositionEntity();
        newPos.uniteds.push(unExist);
        newPos.name=dto.name;
        newPos.requiredSkill=dto.requiredSkill;
        newPos.description=dto.description;
        newPos.enabled=true;
        //this.edificeRepository.create(dto);
        return await this.positionRepository.save(newPos);
    }

    public async editPosition(id: number, dto: EditPositionDto):Promise<PositionEntity> {
        const posEnt = await this.getPosition(id);
        if(!posEnt)throw new NotFoundException('no se encontro el cargo');
        const editedPos = Object.assign(posEnt, dto);
        const result=await this.positionRepository.save(editedPos);
        return result;
    }
}
