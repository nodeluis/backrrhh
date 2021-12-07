import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('login')
    async login(){
        return 'auth';
    }

    @Get('profile')
    profile(){
        return 'estos son tus datos'
    }

}
