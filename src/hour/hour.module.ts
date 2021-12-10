import { Module } from '@nestjs/common';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourHandEntity } from 'src/models/hour-hand/HourHand.entity';
import { HourEntity } from 'src/models/hour/Hour.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HourHandEntity,HourEntity])
  ],
  providers: [HourService],
  controllers: [HourController]
})
export class HourModule {}
