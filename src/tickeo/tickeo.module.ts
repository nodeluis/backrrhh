import { Module } from '@nestjs/common';
import { TickeoService } from './tickeo.service';
import { TickeoController } from './tickeo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourEntity } from 'src/models/hour/Hour.entity';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';
import { TickeoEntity } from 'src/models/tickeo/Tickeo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HourEntity,EmployeeEntity,TickeoEntity])
  ],
  providers: [TickeoService],
  controllers: [TickeoController]
})
export class TickeoModule {}
