import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/models/users/User.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UsersService } from './users.service';

@ApiTags('User routes')
@Controller('users')
export class UsersController {

    constructor(
        private userService:UsersService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ){}

    @Get()
    async getAllUsers(){
        try {
            const data=await this.userService.getAllUsers();
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        try {
            const data = await this.userService.getUser(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER,
    })
    @Post()
    async createUser(@Body() user: CreateUserDto){
        try {
            const data=await this.userService.createUser(user);
            return { message:'Usuario creado', data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER,
    })
    @Put(':id')
    async editUser(
        @Param('id') id: number,
        @Body() dto: EditUserDto,
        //con esto rescatamos el usuario que esta haciendo la peticion de los headers
        @User() user: UserEntity,
    ) {
        try { 
            let data;
            if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
                // esto es un admin
                const { employeeId , ...rest } = dto;
                data = await this.userService.editUser(id, rest);
            } else {
                // esto es otro rol q solo pueda editar su usuario
                const { roles, employeeId , ...rest } = dto;
                data = await this.userService.editUser(id, rest, user);
            }
            return { message:'Usuario actualizado', data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        action: 'delete',
        //solo un admin puede eliminar este usuario
        possession: 'own',
        resource: AppResource.USER,
    })
    @Delete(':id')
    async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
        let data;

        if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
            // esto es un admin puede eliminar cualquier usuario
            data = await this.userService.deleteUser(id);
        } else {
            // esto es otro rol solo puede eliminar su usuario
            data = await this.userService.deleteUser(id, user);
        }
        return { message: 'User deleted', data };
    }

}
