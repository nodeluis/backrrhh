import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/users/User.entity';
import { UserInterface } from 'src/models/users/User.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ){}

    public async getAllUsers():Promise<UserInterface[]> {
        return await this.userRepository.find();
    }
    
    public async getUser(id: number):Promise<UserEntity>{
        const user = await this.userRepository.findOne(id);
    
        if (!user)throw new NotFoundException('no se encontro el usuario');
    
        return user;
    }

    public async createUser(data:CreateUserDto):Promise<UserEntity>{

        const userExist: UserEntity = await this.userRepository.findOne({ user:data.user });

        if(userExist)throw new BadRequestException('El usuario ya existe');

        const newUser: UserEntity = this.userRepository.create(data);
        
        const user = await this.userRepository.save(newUser);

        delete user.password;
        return user;
    }

    public async editUser(id: number, dto: EditUserDto):Promise<UserEntity> {
        const user = await this.getUser(id);
        const editedUser = Object.assign(user, dto);

        const result=await this.userRepository.save(editedUser);
        delete result.password;
        return result;
    }

    public async deleteOne(id: number) {
        const user = await this.getUser(id);
        return await this.userRepository.remove(user);
    }
}
