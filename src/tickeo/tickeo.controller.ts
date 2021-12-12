import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateTickeoDto } from './dtos/create-tickeo.dto';
import { EditTickeoDto } from './dtos/edit-tickeo.dto';
import { TickeoService } from './tickeo.service';

@ApiTags('Tickeo routes')
@Controller('tickeo')
export class TickeoController {
    constructor(
        private tickeoService:TickeoService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.TICKEO,
    })
    @Get()
    async findTickeos(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.tickeoService.getTickeos(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.TICKEO,
    })
    @Get(':id')
    async findTickeo(@Param('id') id: number) {
        try {
            const data = await this.tickeoService.getTickeo(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.TICKEO,
    })
    @Post()
    async createTickeo(@Body() dto: CreateTickeoDto){
        try {
            const data=await this.tickeoService.createTickeo(dto);
            return { message:'Tickeo creado', data };
        } catch (error) {
            return error;
        }
    }


    /*@Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.TICKEO,
    })
    @Put(':id')
    async editTickeo(
        @Param('id') id: number,
        @Body() dto: EditTickeoDto,
    ) {
        try {
            const {employeeId,hourId,...rest}=dto;
            const data = await this.tickeoService.editTickeo(id, rest);
            return { message:'Tickeo actualizado', data };
        } catch (error) {
            return error;
        }
    }*/
}
