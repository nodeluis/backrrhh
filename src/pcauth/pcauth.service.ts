import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { EdificeEntity } from 'src/models/edifice/Edifice.entity';
import { PcAuthEntity } from 'src/models/pcauth/pcauth.entity';
import { PcAuthInterface } from 'src/models/pcauth/pcauth.interface';
import { Between, Like, Repository } from 'typeorm';
import { CreatePcAuthDto } from './dtos/create-pc-auth.dto';
import { StatePcAuthDto } from './dtos/state-pc-auth.dto';
import { EditPcAuthDto } from './dtos/update-pc-auth.dto';

@Injectable()
export class PcauthService {
    constructor(
        @InjectRepository(PcAuthEntity) private pcAuthRepository: Repository<PcAuthEntity>,
        @InjectRepository(EdificeEntity) private edificeRepository: Repository<EdificeEntity>
    ){}

    public async getPcAuths(paginationQuery:PaginationQuery):Promise<PcAuthInterface[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.pcAuthRepository.find({
                    where:[
                        {ip:Like(`%${search}%`)},
                        {mac:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.pcAuthRepository.find({
                    where: [
                        {
                            last_update: Between(
                                date1.toISOString(),
                                date2.toISOString(),
                            ),
                        },
                        {
                            last_connection: Between(
                                date1.toISOString(),
                                date2.toISOString(),
                            ),
                        },
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
                return await this.pcAuthRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getPcAuth(id: number):Promise<PcAuthEntity>{

        const pcEnt = await this.pcAuthRepository.findOne(id);
    
        if (!pcEnt)throw new NotFoundException('no se encontro la pc');
    
        return pcEnt;
    }

    public async createPcAuth(dto: CreatePcAuthDto):Promise<PcAuthEntity>{

        const pcExist: PcAuthEntity = await this.pcAuthRepository.findOne({ mac:dto.mac });
        if(pcExist)throw new BadRequestException('La pc ya existe');

        const edEnt: EdificeEntity = await this.edificeRepository.findOne({ where:{id:dto.edificeId} });
        if(!edEnt)throw new BadRequestException('No se pudo encontrar el edificio');

        const newPc: PcAuthEntity = new PcAuthEntity();

        newPc.edifice=edEnt;
        newPc.ip=dto.ip;
        newPc.mac=dto.mac;

        return await this.pcAuthRepository.save(newPc);
    }

    public async editPcAuth(id: number, dto: EditPcAuthDto):Promise<PcAuthEntity> {
        
        const pcEnt: PcAuthEntity = await this.getPcAuth(id);

        const editedPc: PcAuthEntity = Object.assign(pcEnt, dto);

        const result=await this.pcAuthRepository.save(editedPc);
        
        return result;
    }

    public async statePcAuth(id: number, dto: StatePcAuthDto):Promise<PcAuthEntity> {
        const pcEnt: PcAuthEntity = await this.getPcAuth(id);
        
        const editedPc: PcAuthEntity = Object.assign(pcEnt, dto);

        const result=await this.pcAuthRepository.save(editedPc);
        
        return result;
    }
}
