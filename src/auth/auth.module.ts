import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/users/User.entity';
import { PermissionEntity } from 'src/models/permissions/Permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,PermissionEntity])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
