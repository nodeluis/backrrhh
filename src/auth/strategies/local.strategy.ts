import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


/**
 * estrategias de autenticacion
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({
            usernameField:'user',
            passwordField:'password',
        });
    }

    async validate(user: string,password: string){
        //buscar un usuario q exista
        const userEnt=await this.authService.validateUser(user,password);
        if(!userEnt)throw new UnauthorizedException('Usuario o contraseña incorrectos');
        return userEnt;
    }
}