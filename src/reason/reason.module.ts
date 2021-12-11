import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonEntity } from 'src/models/reason/Reason.entity';
import { RegularizationEntity } from 'src/models/regularization/Regularization.entity';
import { ReasonController } from './reason.controller';
import { ReasonService } from './reason.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReasonEntity,RegularizationEntity])
  ],
  controllers: [ReasonController],
  providers: [ReasonService]
})
export class ReasonModule {}
