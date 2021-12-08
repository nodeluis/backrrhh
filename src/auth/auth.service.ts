import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserEntity } from 'src/models/users/User.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}

    public async validateUser(user:string, password:string): Promise<any>{
        const userEnt=await this.userService.findOne({user});
        if (userEnt && (await compare(password, userEnt.password))) {
            const { password, ...rest } = userEnt;
            return rest;
        }
        
        return null;
    }

    public async login(userEnt: UserEntity){
        const {id, ...rest}= userEnt;
        const payload={sub:id};
        return {
            user:userEnt,
            token:this.jwtService.sign(payload)
        }
    }

}
