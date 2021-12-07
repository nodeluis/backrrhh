import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService:UsersService
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

    @Post()
    async createUser(@Body() user: CreateUserDto){
        try {
            const data=await this.userService.createUser(user);
            return { message:'Usuario creado', data };
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    async editOne(
        @Param('id') id: number,
        @Body() dto: EditUserDto,
    ) {
        try {
            const data=await this.userService.editUser(id,dto);
            return { message:'Usuario actualizado', data };
        } catch (error) {
            return error;
        }
    }

}
