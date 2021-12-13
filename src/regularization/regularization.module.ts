import { Module } from '@nestjs/common';
import { RegularizationService } from './regularization.service';
import { RegularizationController } from './regularization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonEntity } from 'src/models/reason/Reason.entity';
import { TickeoEntity } from 'src/models/tickeo/Tickeo.entity';
import { RegularizationEntity } from 'src/models/regularization/Regularization.entity';
import { UserEntity } from 'src/models/users/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReasonEntity,RegularizationEntity,TickeoEntity,UserEntity])
  ],
  providers: [RegularizationService],
  controllers: [RegularizationController]
})
export class RegularizationModule {}
