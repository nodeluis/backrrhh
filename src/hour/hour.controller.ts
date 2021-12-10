import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateHourDto } from './dtos/create-hour.dto';
import { EditHourDto } from './dtos/edit-hour.dto';
import { HourService } from './hour.service';

@ApiTags('Hour routes')
@Controller('hour')
export class HourController {
    constructor(
        private hourService:HourService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.HOUR,
    })
    @Get()
    async findHours(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.hourService.getHours(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.HOUR,
    })
    @Get(':id')
    async findHour(@Param('id') id: number) {
        try {
            const data = await this.hourService.getHour(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.HOUR_HAND,
    })
    @Post()
    async createHour(@Body() dto: CreateHourDto){
        try {
            const data=await this.hourService.createHour(dto);
            return { message:'Hora creada', data };
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
    async editHour(
        @Param('id') id: number,
        @Body() dto: EditHourDto,
    ) {
        try { 
            const data = await this.hourService.editHour(id, dto);
            return { message:'Hora actualizada', data };
        } catch (error) {
            return error;
        }
    }
}
