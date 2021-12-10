import { Module } from '@nestjs/common';
import { HourHandService } from './hour-hand.service';
import { HourHandController } from './hour-hand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourHandEntity } from 'src/models/hour-hand/HourHand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HourHandEntity])
  ],
  providers: [HourHandService],
  controllers: [HourHandController]
})
export class HourHandModule {}
