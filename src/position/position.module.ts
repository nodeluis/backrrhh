import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/models/position/Position.entity';
import { UnitedEntity } from 'src/models/united/United.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnitedEntity,PositionEntity])
  ],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}
