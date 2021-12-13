import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAfiliationEntity } from 'src/models/type-afiliation/TypeAfiliation.entity';
import { TypeAfiliationController } from './type-afiliation.controller';
import { TypeAfiliationService } from './type-afiliation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeAfiliationEntity])
  ],
  controllers: [TypeAfiliationController],
  providers: [TypeAfiliationService]
})
export class TypeAfiliationModule {}
