import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreatePositionDto } from './dtos/create-position.dto';
import { EditPositionDto } from './dtos/edit-position.dto';
import { PositionService } from './position.service';

@ApiTags('Position/Charge routes')
@Controller('position')
export class PositionController {
    constructor(
        private positionService:PositionService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.POSITION,
    })
    @Get()
    async findPositions(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.positionService.getPositions(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.POSITION,
    })
    @Get(':id')
    async findPositionh(@Param('id') id: number) {
        try {
            const data = await this.positionService.getPosition(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.POSITION,
    })
    @Post()
    async createPosition(@Body() dto: CreatePositionDto){
        try {
            const data=await this.positionService.createPosition(dto);
            return { message:'Cargo creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.POSITION,
    })
    @Put(':id')
    async editPosition(
        @Param('id') id: number,
        @Body() dto: EditPositionDto,
    ) {
        try {
            const {unitedId, ...rest}= dto;
            const data = await this.positionService.editPosition(id, rest);
            return { message:'Pc actualizada', data };
        } catch (error) {
            return error;
        }
    }
}
