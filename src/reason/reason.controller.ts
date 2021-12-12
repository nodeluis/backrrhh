import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { EditReasonDto } from './dtos/edit-reason.dto';
import { ReasonService } from './reason.service';

@ApiTags('Reason routes')
@Controller('reason')
export class ReasonController {
    constructor(
        private reasonService:ReasonService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.REASON,
    })
    @Get()
    async findEdificies(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.reasonService.getReasons(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.REASON,
    })
    @Get(':id')
    async findEmployee(@Param('id') id: number) {
        try {
            const data = await this.reasonService.getReason(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.REASON,
    })
    @Post()
    async createEmployee(@Body() dto: CreateReasonDto){
        try {
            const data=await this.reasonService.createReason(dto);
            return { message:'Motivo creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.REASON,
    })
    @Put(':id')
    async editEmployee(
        @Param('id') id: number,
        @Body() dto: EditReasonDto,
    ) {
        try { 
            const data = await this.reasonService.editReason(id, dto);
            return { message:'Motivo actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
