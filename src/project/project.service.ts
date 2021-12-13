import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { TypeCasePagination, TypeQuery } from 'src/common/helpers/typeQuery';
import { TypeQueryInterface } from 'src/common/interface/type-query.interface';
import { ProfessionEntity } from 'src/models/profession/Profession.entity';
import { ProjectEntity } from 'src/models/project/Project.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { EditProjectDto } from './dtos/edit-project.dto';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity) private projectRepository: Repository<ProjectEntity>,
    ){}

    public async getProjects(paginationQuery:PaginationQuery):Promise<ProjectEntity[]> {
        const {page,limit}:PaginationQuery=paginationQuery;
        if(isEmpty(page)||isEmpty(limit))throw new BadRequestException('Se requiere la pagina y el limite');
        const {type,date1,date2,search}: TypeQueryInterface=TypeQuery(paginationQuery);
        const {DATE,NONE,TEXT}=TypeCasePagination;
        const skip=(limit*page)-limit;
        switch (type) {
            case TEXT:
                return await this.projectRepository.find({
                    where:[
                        {name:Like(`%${search}%`)},
                        {code:Like(`%${search}%`)}
                    ],
                    skip,
                    take:limit
                });
            case DATE:
                return await this.projectRepository.find({
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
                return await this.projectRepository.find({
                    skip,
                    take:limit
                });
        }
    }

    public async getProject(id: number):Promise<ProjectEntity>{

        const projectEnt = await this.projectRepository.findOne(id);
    
        if (!projectEnt)throw new NotFoundException('no se encontro el proyecto');
    
        return projectEnt;
    }

    public async createProject(dto: CreateProjectDto):Promise<ProjectEntity>{

        const projectExist: ProjectEntity = await this.projectRepository.findOne({ name:dto.name });
        if(projectExist)throw new BadRequestException('El proyecto ya existe');

        const newPr: ProjectEntity = this.projectRepository.create(dto);

        return this.projectRepository.save(newPr);

    }

    public async editProject(id: number, dto: EditProjectDto):Promise<ProjectEntity> {
        
        const projectEnt: ProjectEntity = await this.getProject(id);

        const editedPr: ProjectEntity = Object.assign(projectEnt, dto);

        const result=await this.projectRepository.save(editedPr);
        
        return result;
    }
}
