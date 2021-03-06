import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateEdificeDto } from './dtos/create-edifice.sto';
import { EditEdificeDto } from './dtos/edit-edifice.dto';
import { EdificeService } from './edifice.service';

@ApiTags('Edifice routes')
@Controller('edifice')
export class EdificeController {
    constructor(
        private edificeService:EdificeService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.EDIFICE,
    })
    @Get()
    async findEdificies(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.edificeService.getEdificies(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.EDIFICE,
    })
    @Get(':id')
    async findEmployee(@Param('id') id: number) {
        try {
            const data = await this.edificeService.getEdifice(id);
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
    async createEmployee(@Body() dto: CreateEdificeDto){
        try {
            const data=await this.edificeService.createEdifice(dto);
            return { message:'Edificio creado', data };
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
    async editEmployee(
        @Param('id') id: number,
        @Body() dto: EditEdificeDto,
    ) {
        try { 
            const data = await this.edificeService.editEdifice(id, dto);
            return { message:'Edificio actualizado', data };
        } catch (error) {
            return error;
        }
    }


}
