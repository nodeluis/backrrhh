import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_USER_USER, DEFAULT_USER_PASSWORD } from './constants';
import { UserEntity } from 'src/models/users/User.entity';


export const setDefaultUser = async (config: ConfigService) => {
    const userRepository = getRepository<UserEntity>(UserEntity);

    //columna usuario
    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('user = :user', {
            user: config.get<string>(DEFAULT_USER_USER),
        })
        .getOne();

    if (!defaultUser) {
        const adminUser = userRepository.create({
        user: config.get<string>(DEFAULT_USER_USER),
        password: config.get<string>(DEFAULT_USER_PASSWORD),
        roles: ['ADMIN'],
        });

        return await userRepository.save(adminUser);
    }
};