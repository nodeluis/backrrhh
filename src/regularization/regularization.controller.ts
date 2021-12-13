import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { UserEntity } from 'src/models/users/User.entity';
import { CreateRegularizationDto } from './dtos/create-regularization.dto';
import { RegularizationService } from './regularization.service';

@ApiTags('Regularization routes')
@Controller('regularization')
export class RegularizationController {
    constructor(
        private regularizationService:RegularizationService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.REGULARIZATION,
    })
    @Get()
    async findRegs(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.regularizationService.getRegularizations(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.REGULARIZATION,
    })
    @Get(':id')
    async findReg(@Param('id') id: number) {
        try {
            const data = await this.regularizationService.getRegularization(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.REGULARIZATION,
    })
    @Post()
    async createReg(@Body() dto: CreateRegularizationDto,@User() user: UserEntity){
        try {
            const data=await this.regularizationService.createRegularization(dto,user);
            return { message:'Regularización creada', data };
        } catch (error) {
            return error;
        }
    }

}
