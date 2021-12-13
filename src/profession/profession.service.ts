import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { ProfessionEntity } from 'src/models/profession/Profession.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateProfessionDto } from './dtos/create-profession.dto';
import { EditProfessionDto } from './dtos/edit-profession.dto';

@Injectable()
export class ProfessionService {

    constructor(
        @InjectRepository(ProfessionEntity) private professionRepository: Repository<ProfessionEntity>,
    ){}

    public async getProfessions(paginationQuery:PaginationQuery):Promise<ProfessionEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.professionRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {abbreviation:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.professionRepository.find({
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
                return await this.professionRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getProfession(id: number):Promise<ProfessionEntity>{

        const professionEnt = await this.professionRepository.findOne(id);
    
        if (!professionEnt)throw new NotFoundException('no se encontro la profesión');
    
        return professionEnt;
    }

    public async createProfession(dto: CreateProfessionDto):Promise<ProfessionEntity>{

        const pfExist: ProfessionEntity = await this.professionRepository.findOne({ name:dto.name });
        if(pfExist)throw new BadRequestException('La profesión ya existe');

        const newPf: ProfessionEntity = this.professionRepository.create(dto);

        return this.professionRepository.save(newPf);

    }

    public async editProfession(id: number, dto: EditProfessionDto):Promise<ProfessionEntity> {
        
        const pfEnt: ProfessionEntity = await this.getProfession(id);

        const editedPf: ProfessionEntity = Object.assign(pfEnt, dto);

        const result=await this.professionRepository.save(editedPf);
        
        return result;
    }
}
