import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateProjectDto } from './dtos/create-project.dto';
import { EditProjectDto } from './dtos/edit-project.dto';
import { ProjectService } from './project.service';

@ApiTags('Project routes')
@Controller('project')
export class ProjectController {

    constructor(
        private projectService:ProjectService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PROJECT,
    })
    @Get()
    async findPcAuths(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.projectService.getProjects(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PROJECT,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.projectService.getProject(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.PROJECT,
    })
    @Post()
    async createPcAuth(@Body() dto: CreateProjectDto){
        try {
            const data=await this.projectService.createProject(dto);
            return { message:'Proyecto creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.PROJECT,
    })
    @Put(':id')
    async editPcAuth(
        @Param('id') id: number,
        @Body() dto: EditProjectDto,
    ) {
        try { 
            const data = await this.projectService.editProject(id, dto);
            return { message:'Proyecto actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
