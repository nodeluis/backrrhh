import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    /**
     * alias a la configuracion
     * eso le va dar formas para que el metodo acceda a esa config
     */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req:any){
        return req.user;
    }

    @Get('profile')
    profile(){
        return 'estos son tus datos'
    }

}
