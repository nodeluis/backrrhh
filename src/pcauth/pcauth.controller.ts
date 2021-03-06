import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreatePcAuthDto } from './dtos/create-pc-auth.dto';
import { EditPcAuthDto } from './dtos/update-pc-auth.dto';
import { PcauthService } from './pcauth.service';

@ApiTags('Pc Auth routes')
@Controller('pcauth')
export class PcauthController {
    constructor(
        private pcService:PcauthService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PCAUTH,
    })
    @Get()
    async findPcAuths(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.pcService.getPcAuths(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.PCAUTH,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.pcService.getPcAuth(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.PCAUTH,
    })
    @Post()
    async createPcAuth(@Body() dto: CreatePcAuthDto){
        try {
            const data=await this.pcService.createPcAuth(dto);
            return { message:'Pc autorizada creada', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.PCAUTH,
    })
    @Put(':id')
    async editPcAuth(
        @Param('id') id: number,
        @Body() dto: EditPcAuthDto,
    ) {
        try { 
            const data = await this.pcService.editPcAuth(id, dto);
            return { message:'Pc actualizada', data };
        } catch (error) {
            return error;
        }
    }
}
