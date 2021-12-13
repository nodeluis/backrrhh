import { Body, Controller, Get, HttpException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateTypeEmployeeDto } from './dtos/create-type-employee.dto';
import { EditTypeEmployeeDto } from './dtos/edit-type-employee.dto';
import { TypeEmployeeService } from './type-employee.service';

@ApiTags('Type Employee routes')
@Controller('type-employee')
export class TypeEmployeeController {

    constructor(
        private typeEmployeeService:TypeEmployeeService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.TYPEEMPLOYEE,
    })
    @Get()
    async findStudies(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.typeEmployeeService.getTypeEmployees(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.TYPEEMPLOYEE,
    })
    @Get(':id')
    async findPcAuth(@Param('id') id: number) {
        try {
            const data = await this.typeEmployeeService.getTypeEmployee(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.TYPEEMPLOYEE,
    })
    @Post()
    async createPcAuth(@Body() dto: CreateTypeEmployeeDto){
        try {
            const data=await this.typeEmployeeService.createTypeEmployee(dto);
            return { message:'Typo de empleado creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.TYPEEMPLOYEE,
    })
    @Put(':id')
    async editPcAuth(
        @Param('id') id: number,
        @Body() dto: EditTypeEmployeeDto
    ) {
        try {
            const {typeAfiliationId, ...rest}=dto;
            const data = await this.typeEmployeeService.editTypeEmployee(id, rest);
            return { message:'Typo de empleado actualizado', data };
        } catch (error) {
            return error;
        }
    }
}
