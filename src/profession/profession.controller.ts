import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateProfessionDto } from './dtos/create-profession.dto';
import { EditProfessionDto } from './dtos/edit-profession.dto';
import { ProfessionService } from './profession.service';

@ApiTags('Profession routes')
@Controller('profession')
export class ProfessionController {

    constructor(
        private professionService:ProfessionService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PROFESSION,
    })
    @Get()
    async findPcAuths(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.professionService.getProfessions(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PROFESSION,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.professionService.getProfession(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.EDIFICE,
    })
    @Post()
    async createPcAuth(@Body() dto: CreateProfessionDto){
        try {
            const data=await this.professionService.createProfession(dto);
            return { message:'Profesión creada', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.EDIFICE,
    })
    @Put(':id')
    async editPcAuth(
        @Param('id') id: number,
        @Body() dto: EditProfessionDto,
    ) {
        try { 
            const data = await this.professionService.editProfession(id, dto);
            return { message:'Profesión actualizada', data };
        } catch (error) {
            return error;
        }
    }
}
