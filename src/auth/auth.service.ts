import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService
    ){}

    async validateUser(user:string, password:string): Promise<any>{
        const userEnt=await this.userService.findOne({user});
        if (userEnt && (await compare(password, userEnt.password))) {
            const { password, ...rest } = userEnt;
            return rest;
        }
        
        return null;
    }

}
