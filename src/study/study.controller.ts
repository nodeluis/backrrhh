import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateStudyDto } from './dtos/create-study.dto';
import { EditStudyDto } from './dtos/edit-study.dto';
import { StudyService } from './study.service';

@ApiTags('Study routes')
@Controller('study')
export class StudyController {
    constructor(
        private studyService:StudyService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.STUDY,
    })
    @Get()
    async findStudies(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.studyService.getStudies(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.STUDY,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.studyService.getStudy(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.STUDY,
    })
    @Post()
    async createPcAuth(@Body() dto: CreateStudyDto){
        try {
            const data=await this.studyService.createStudy(dto);
            return { message:'Modelo de estudio creado', data };
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
        @Body() dto: EditStudyDto,
    ) {
        try { 
            const data = await this.studyService.editStudy(id, dto);
            return { message:'Modelo de estudio actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
