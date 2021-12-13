import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { TypeAfiliationEntity } from 'src/models/type-afiliation/TypeAfiliation.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateTypeAfiliationDto } from './dtos/create-type-afiliation.dto';
import { EditTypeAfiliationDto } from './dtos/edit-type-afiliation.dto';

@Injectable()
export class TypeAfiliationService {
    constructor(
        @InjectRepository(TypeAfiliationEntity) private afiliationRepository: Repository<TypeAfiliationEntity>,
    ){}

    public async getAfiliations(paginationQuery:PaginationQuery):Promise<TypeAfiliationEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.afiliationRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.afiliationRepository.find({
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
                return await this.afiliationRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getAfiliation(id: number):Promise<TypeAfiliationEntity>{

        const afEnt = await this.afiliationRepository.findOne(id);
    
        if (!afEnt)throw new NotFoundException('no se encontro el tipo de afiliación');
    
        return afEnt;
    }

    public async createAfiliation(dto: CreateTypeAfiliationDto):Promise<TypeAfiliationEntity>{

        const afiliationExist: TypeAfiliationEntity = await this.afiliationRepository.findOne({ name:dto.name });
        if(afiliationExist)throw new BadRequestException('El tipo de afiliación ya existe');

        const newAf: TypeAfiliationEntity = this.afiliationRepository.create(dto);

        return this.afiliationRepository.save(newAf);

    }

    public async editAfiliation(id: number, dto: EditTypeAfiliationDto):Promise<TypeAfiliationEntity> {
        
        const afEnt: TypeAfiliationEntity = await this.getAfiliation(id);

        const editedAf: TypeAfiliationEntity = Object.assign(afEnt, dto);

        const result=await this.afiliationRepository.save(editedAf);
        
        return result;
    }
}
