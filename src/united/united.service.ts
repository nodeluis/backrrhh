import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { UnitedEntity } from 'src/models/united/United.entity';
import { Between, Like, Repository, TreeRepository } from 'typeorm';
import { CreateUnitedDto } from './dtos/create-united.dto';
import { EditUnitedDto } from './dtos/edit-united.dto';

@Injectable()
export class UnitedService {

    constructor(
        @InjectRepository(UnitedEntity) private unitedRepository: Repository<UnitedEntity>,
        @InjectRepository(UnitedEntity) private unitedThreeRepository: TreeRepository<UnitedEntity>,
    ){}

    public async getUniteds(paginationQuery:PaginationQuery):Promise<UnitedEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.unitedRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {code:Like(`%${search}%`)},
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.unitedRepository.find({
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
                return await this.unitedThreeRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getTrees():Promise<UnitedEntity[]> {
        return await this.unitedThreeRepository.findTrees();
    }

    public async getUnited(id: number):Promise<UnitedEntity>{

        const emEnt = await this.unitedRepository.findOne(id);
    
        if (!emEnt)throw new NotFoundException('No se encontro la unidad');
    
        return emEnt;
    }

    public async createUnited(dto: CreateUnitedDto):Promise<UnitedEntity>{

        const unitedExist: UnitedEntity = await this.unitedRepository.findOne({
            where:[{name:dto.name},
                {code:dto.code},
            ]
        });
        if(unitedExist)throw new BadRequestException('La unidad ya existe en la base de datos');

        const newUe: UnitedEntity = this.unitedRepository.create(dto);

        return this.unitedRepository.save(newUe);

    }

    public async editUnited(id: number, dto: EditUnitedDto ,unitedId?: number):Promise<UnitedEntity> {
        
        const ueEnt: UnitedEntity = await this.getUnited(id);
        if(unitedId&&id==unitedId)throw new BadRequestException('El id enviado es igual al id que quiere asociar');
        if(unitedId){
            const childUeEnt: UnitedEntity = await this.getUnited(unitedId);
            childUeEnt.p=false;
            childUeEnt.parent=ueEnt;
            await this.unitedRepository.save(childUeEnt);
        }

        const ueEdit: UnitedEntity=Object.assign(ueEnt, dto);

        const result=await this.unitedRepository.save(ueEdit);
        
        return result;
    }
}
