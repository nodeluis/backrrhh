import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/models/permissions/Permission.entity';
import { UserEntity } from 'src/models/users/User.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,PermissionEntity])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
