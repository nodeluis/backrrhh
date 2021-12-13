import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { ReasonEntity } from 'src/models/reason/Reason.entity';
import { RegularizationEntity } from 'src/models/regularization/Regularization.entity';
import { TickeoEntity } from 'src/models/tickeo/Tickeo.entity';
import { UserEntity } from 'src/models/users/User.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateRegularizationDto } from './dtos/create-regularization.dto';
import { EditRegularizationDto } from './dtos/edit-regularization.dto';

@Injectable()
export class RegularizationService {
    constructor(
        @InjectRepository(ReasonEntity) private reasonRepository: Repository<ReasonEntity>,
        @InjectRepository(RegularizationEntity) private regularizationRepository: Repository<RegularizationEntity>,
        @InjectRepository(TickeoEntity) private tickeoRepository: Repository<TickeoEntity>,
    ){}

    public async getRegularizations(paginationQuery:PaginationQuery):Promise<RegularizationEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.regularizationRepository.find({
                    where:[
                        {turn:Like(`%${search}%`)},
                        {detail:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.regularizationRepository.find({
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
                return await this.regularizationRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getRegularization(id: number):Promise<RegularizationEntity>{

        const regEnt = await this.regularizationRepository.findOne(id);
    
        if (!regEnt)throw new NotFoundException('no se encontro la regularización');
    
        return regEnt;
    }

    public async createRegularization(dto: CreateRegularizationDto, userEnt: UserEntity):Promise<RegularizationEntity>{

        const tickeoExist: TickeoEntity = await this.tickeoRepository.findOne({ id:dto.tickeoId });
        if(!tickeoExist)throw new BadRequestException('El tickeo no existe');

        const reasonExist: ReasonEntity = await this.reasonRepository.findOne({ id:dto.reasonId });
        if(!reasonExist)throw new BadRequestException('La razon no existe no existe');

        const newRegularization: RegularizationEntity = new RegularizationEntity();
        newRegularization.reason.push(reasonExist);
        newRegularization.user=userEnt;
        newRegularization.tickeo.push(tickeoExist);
        newRegularization.turn=dto.turn;
        newRegularization.detail=dto.detail;

        return await this.regularizationRepository.save(newRegularization);
    }

    /*public async editRegularization(id: number, dto: EditRegularizationDto):Promise<RegularizationEntity> {
        
        const regEnt: RegularizationEntity = await this.getRegularization(id);

        const editedReg: RegularizationEntity = Object.assign(regEnt, dto);

        const result=await this.regularizationRepository.save(editedReg);
        
        return result;
    }*/
}
