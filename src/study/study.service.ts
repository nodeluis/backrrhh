import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { StudyEntity } from 'src/models/study/Study.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/create-study.dto';
import { EditStudyDto } from './dtos/edit-study.dto';

@Injectable()
export class StudyService {
    constructor(
        @InjectRepository(StudyEntity) private studyRepository: Repository<StudyEntity>,
    ){}

    public async getStudies(paginationQuery:PaginationQuery):Promise<StudyEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.studyRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.studyRepository.find({
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
                return await this.studyRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getStudy(id: number):Promise<StudyEntity>{

        const studyEnt = await this.studyRepository.findOne(id);
    
        if (!studyEnt)throw new NotFoundException('no se encontro el modelo de estudio');
    
        return studyEnt;
    }

    public async createStudy(dto: CreateStudyDto):Promise<StudyEntity>{

        const studyExist: StudyEntity = await this.studyRepository.findOne({ name:dto.name });
        if(studyExist)throw new BadRequestException('El modelo de estudio ya existe');

        const newSt: StudyEntity = this.studyRepository.create(dto);

        return this.studyRepository.save(newSt);

    }

    public async editStudy(id: number, dto: EditStudyDto):Promise<StudyEntity> {
        
        const studyEnt: StudyEntity = await this.getStudy(id);

        const editedSt: StudyEntity = Object.assign(studyEnt, dto);

        const result=await this.studyRepository.save(editedSt);
        
        return result;
    }
}
