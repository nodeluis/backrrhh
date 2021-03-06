import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';
import { UserEntity } from 'src/models/users/User.entity';
import { UserInterface } from 'src/models/users/User.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { UserFindOne } from './interfaces/userFindOne.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(EmployeeEntity) private employeeRepository: Repository<EmployeeEntity>,
    ){}

    public async getAllUsers():Promise<UserInterface[]> {
        return await this.userRepository.find();
    }
    
    public async getUser(id: number, userEnt?: UserEntity):Promise<UserEntity>{
        const user = await this.userRepository.findOne(id)
        .then(u => (!userEnt ? u : !!u && userEnt.id === u.id ? u : null));
    
        if (!user)throw new NotFoundException('no se encontro el usuario');
    
        return user;
    }

    public async createUser(data:CreateUserDto):Promise<UserEntity>{

        const userExist: UserEntity = await this.userRepository.findOne({ user:data.user });

        if(userExist)throw new BadRequestException('El usuario ya existe');

        const empEnt=await this.employeeRepository.findOne({ where:{id:data.employeeId} });
        
        if(!empEnt)throw new BadRequestException('El empleado a asignar este usuario no existe');

        const newUser=new UserEntity();
        
        newUser.employee=empEnt;
        newUser.user=data.user;
        newUser.password=data.password;
        newUser.roles=data.roles;

        const user = await this.userRepository.save(newUser);

        delete user.password;
        return user;
    }

    public async editUser(id: number, dto: EditUserDto, userEnt?: UserEntity):Promise<UserEntity> {
        const user = await this.getUser(id,userEnt);
        const editedUser = Object.assign(user, dto);

        const result=await this.userRepository.save(editedUser);
        delete result.password;
        return result;
    }

    public async deleteUser(id: number, userEnt?: UserEntity) {
        const user = await this.getUser(id,userEnt);
        return await this.userRepository.remove(user);
    }

    public async findOne(data: UserFindOne): Promise<UserEntity>{
        /**
         * constructor de consultas sql con id user
         * selecciona tb el password
         * devuelveme uno
         */
        return await this.userRepository
          .createQueryBuilder('user')
          .where(data)
          .addSelect('user.password')
          .getOne();
    }
}