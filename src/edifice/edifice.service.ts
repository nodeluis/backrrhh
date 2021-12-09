import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { EdificeEntity } from 'src/models/edifice/Edifice.entity';
import { EdificeInterface } from 'src/models/edifice/Edifice.interface';
import { Between, Like, Repository } from 'typeorm';
import { CreateEdificeDto } from './dtos/create-edifice.sto';
import { EditEdificeDto } from './dtos/edit-edifice.dto';
import { StateEdificeDto } from './dtos/state-edifice.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class EdificeService {
    constructor(
        @InjectRepository(EdificeEntity) private edificeRepository: Repository<EdificeEntity>,
    ){}

    public async getEdificies(paginationQuery:PaginationQuery):Promise<EdificeInterface[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.edificeRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {direction:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.edificeRepository.find({
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
                return await this.edificeRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getEdifice(id: number):Promise<EdificeEntity>{

        const edEnt = await this.edificeRepository.findOne(id);
    
        if (!edEnt)throw new NotFoundException('no se encontro el edificio');
    
        return edEnt;
    }

    public async createEdifice(dto: CreateEdificeDto):Promise<EdificeEntity>{

        const edificeExist: EdificeEntity = await this.edificeRepository.findOne({ name:dto.name });
        if(edificeExist)throw new BadRequestException('El edificio ya existe');

        const newEdifice: EdificeEntity = this.edificeRepository.create(dto);

        return await this.edificeRepository.save(newEdifice);
    }

    public async editEdifice(id: number, dto: EditEdificeDto):Promise<EdificeEntity> {
        const edEnt = await this.getEdifice(id);

        if(!edEnt)throw new NotFoundException('no se encontro el edificio');

        const editedEd = Object.assign(edEnt, dto);

        const result=await this.edificeRepository.save(editedEd);
        return result;
    }

    public async stateEdifice(id: number, dto: StateEdificeDto):Promise<EdificeEntity> {
        const edEnt = await this.getEdifice(id);

        if(!edEnt)throw new NotFoundException('no se encontro el edificio');
        
        const editedEd = Object.assign(edEnt, dto);

        const result=await this.edificeRepository.save(editedEd);
        
        return result;
    }
}
