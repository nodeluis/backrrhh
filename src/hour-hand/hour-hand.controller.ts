import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateHourHandDto } from './dtos/create-hour-hand.dto';
import { EditHourHandDto } from './dtos/edit-hour-hand.dto';
import { HourHandService } from './hour-hand.service';

@ApiTags('Hour Hand routes')
@Controller('hour-hand')
export class HourHandController {
    constructor(
        private hourHandService:HourHandService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.HOUR_HAND,
    })
    @Get()
    async findHourHands(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.hourHandService.getHourHands(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.HOUR_HAND,
    })
    @Get(':id')
    async findHourHand(@Param('id') id: number) {
        try {
            const data = await this.hourHandService.getHourHand(id);
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
    async createHourHand(@Body() dto: CreateHourHandDto){
        try {
            const data=await this.hourHandService.createHourHand(dto);
            return { message:'Horario creado', data };
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
    async editHourHand(
        @Param('id') id: number,
        @Body() dto: EditHourHandDto,
    ) {
        try { 
            const data = await this.hourHandService.editHourHande(id, dto);
            return { message:'Horario actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
