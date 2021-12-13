import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitedEntity } from 'src/models/united/United.entity';
import { UnitedController } from './united.controller';
import { UnitedService } from './united.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitedEntity])
  ],
  controllers: [UnitedController],
  providers: [UnitedService]
})
export class UnitedModule {}
