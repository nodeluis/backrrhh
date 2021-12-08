import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User  } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from 'src/models/users/User.entity';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { LoginDto } from './dtos/Login.dto';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    /**
     * alias a la configuracion
     * eso le va dar formas para que el metodo acceda a esa config
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginDto: LoginDto,@User() user:UserEntity){
        const data= await this.authService.login(user);
        return {
            message:'Bienvenido',
            data
        };
    }

    @Auth()
    @Get('profile')
    profile(@User() user:UserEntity){
        return {
            message:'Estos son tus datos',
            data:user
        }
    }

    @Auth()
    @Get('refresh')
    async refreshToken(@User() user: UserEntity) {
        const data =await this.authService.login(user);
        return {
            message: 'Refresh exitoso',
            data,
        };
    }

}
