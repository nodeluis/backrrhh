import { Body, Controller, Get, HttpException, Param, Post, Put, Query, Response, StreamableFile} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeService } from './employee.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { EditEmployeeDto } from './dtos/edit-employee.dto';

@ApiTags('Employee routes')
@Controller('employee')
export class EmployeeController {
    constructor(
        private employeeService:EmployeeService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ){}
    
    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.EMPLOYEE,
    })
    @Get()
    async findEmployees(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.employeeService.getEmployees(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.EMPLOYEE,
    })
    @Get(':id')
    async findEmployee(@Param('id') id: number) {
        try {
            const data = await this.employeeService.getEmployee(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.EMPLOYEE,
    })
    @Post()
    async createEmployee(@Body() dto: CreateEmployeeDto){
        try {
            const data=await this.employeeService.createEmployee(dto);
            return { message:'Empleado creado', data };
        } catch (error) {
            return error;
        }
    }


    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.EMPLOYEE,
    })
    @Put(':id')
    async editEmployee(
        @Param('id') id: number,
        @Body() dto: EditEmployeeDto,
    ) {
        try { 
            const data = await this.employeeService.editEmployee(id, dto);
            return { message:'Empleado actualizado', data };
        } catch (error) {
            return error;
        }
    }
    

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.EMPLOYEE,
    })
    @Get('img/:img')
    async getImg(@Param('img') img:string,@Response({ passthrough: true }) res){
        try {
            const data=`${__dirname}/../images/profile/${img}`;
            const file = createReadStream(join(data));
            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="image_profile.png"',
            });
            return new StreamableFile(file);
        } catch (error) {
            return error;
        }
    }

}
