import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { PermissionEntity } from 'src/models/permissions/Permission.entity';
import { UserEntity } from 'src/models/users/User.entity';
import { UserInterface } from 'src/models/users/User.interface';
import { Repository } from 'typeorm';
import { CreateUser } from '../dtos/CreateSimpleUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(PermissionEntity) private permissionRepository: Repository<PermissionEntity>,
    ){}

    public async createUser({user,password}:CreateUser):Promise<UserInterface>{
        if(isEmpty(user))throw new HttpException('Error data no enviada',409);

        let userEnt: UserEntity=new UserEntity();
        userEnt.user=user;
        userEnt.password=password;
        const permEnt: PermissionEntity=new PermissionEntity();
        await this.permissionRepository.save(permEnt);
        userEnt.permissions=permEnt;
        const result: UserInterface=await this.userRepository.save(userEnt);

        return result;
    }
}
