import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { ReasonEntity } from 'src/models/reason/Reason.entity';
import { RegularizationEntity } from 'src/models/regularization/Regularization.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { EditReasonDto } from './dtos/edit-reason.dto';

@Injectable()
export class ReasonService {
    constructor(
        @InjectRepository(ReasonEntity) private reasonRepository: Repository<ReasonEntity>,
        @InjectRepository(RegularizationEntity) private regRepository: Repository<RegularizationEntity>
    ){}

    public async getReasons(paginationQuery:PaginationQuery):Promise<ReasonEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.reasonRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {type:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.reasonRepository.find({
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
                return await this.reasonRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getReason(id: number):Promise<ReasonEntity>{

        const reasonEnt = await this.reasonRepository.findOne(id);
    
        if (!reasonEnt)throw new NotFoundException('No se encontro el motivo');
    
        return reasonEnt;
    }

    public async createReason(dto: CreateReasonDto):Promise<ReasonEntity>{

        const regEnt: RegularizationEntity = await this.regRepository.findOne({ id:dto.regularizationId });
        if(!regEnt)throw new BadRequestException('La regularización no existe');

        const newReason: ReasonEntity = new ReasonEntity();
        newReason.name=dto.name;
        newReason.type=dto.type;
        newReason.regularization=regEnt;

        return await this.regRepository.save(newReason);
    }

    public async editReason(id: number, dto: EditReasonDto):Promise<ReasonEntity> {
        const reasonEnt = await this.getReason(id);

        if(!reasonEnt)throw new NotFoundException('No se encontro el motivo');

        const reasonEd = Object.assign(reasonEnt, dto);

        const result=await this.reasonRepository.save(reasonEd);
        return result;
    }
}
