import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateTypeAfiliationDto } from './dtos/create-type-afiliation.dto';
import { EditTypeAfiliationDto } from './dtos/edit-type-afiliation.dto';
import { TypeAfiliationService } from './type-afiliation.service';

@ApiTags('Type Afiliation routes')
@Controller('type-afiliation')
export class TypeAfiliationController {
    constructor(
        private afiliationService:TypeAfiliationService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.AFILIATION,
    })
    @Get()
    async findStudies(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.afiliationService.getAfiliations(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.AFILIATION,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.afiliationService.getAfiliation(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.AFILIATION,
    })
    @Post()
    async createPcAuth(@Body() dto: CreateTypeAfiliationDto){
        try {
            const data=await this.afiliationService.createAfiliation(dto);
            return { message:'Typo de afiliación creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.AFILIATION,
    })
    @Put(':id')
    async editPcAuth(
        @Param('id') id: number,
        @Body() dto: EditTypeAfiliationDto,
    ) {
        try { 
            const data = await this.afiliationService.editAfiliation(id, dto);
            return { message:'Typo de afiliación actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
