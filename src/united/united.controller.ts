import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateUnitedDto } from './dtos/create-united.dto';
import { EditUnitedDto } from './dtos/edit-united.dto';
import { UnitedService } from './united.service';

@ApiTags('United routes')
@Controller('united')
export class UnitedController {

    constructor(
        private unitedService:UnitedService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.UNITED,
    })
    @Get()
    async findUniteds(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.unitedService.getUniteds(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.UNITED,
    })
    @Get('trees')
    async findTrees() {
        try { 
            const data=await this.unitedService.getTrees();
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.UNITED,
    })
    @Get(':id')
    async findUnited(@Param('id') id: number) {
        try {
            const data = await this.unitedService.getUnited(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.UNITED,
    })
    @Post()
    async createUnited(@Body() dto: CreateUnitedDto){
        try {
            const data=await this.unitedService.createUnited(dto);
            return { message:'Unidad creada', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.UNITED,
    })
    @Put(':id')
    async editUnited(
        @Param('id') id: number,
        @Body() dto: EditUnitedDto,
    ) {
        try {
            let data;
            if(dto.unitedId){
                const {unitedId, ...rest}=dto;
                data = await this.unitedService.editUnited(id, rest, unitedId);
            }else{
                data = await this.unitedService.editUnited(id, dto);
            }
            return { message:'Unidad actualizada', data };
        } catch (error) {
            return error;
        }
    }
}
