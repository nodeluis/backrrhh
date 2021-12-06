import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUser } from '../dtos/CreateSimpleUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService:UsersService
    ){}

    @Post('createUser')
    async createUser(@Body() user: CreateUser){
        try {
            const result=await this.userService.createUser(user);
            return result;
        } catch (error) {
            new HttpException(error,409);
        }
    }

}
