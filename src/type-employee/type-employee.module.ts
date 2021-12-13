import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAfiliationEntity } from 'src/models/type-afiliation/TypeAfiliation.entity';
import { TypeEmployeeEntity } from 'src/models/type-employee/TypeEmployee.entity';
import { TypeEmployeeController } from './type-employee.controller';
import { TypeEmployeeService } from './type-employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeAfiliationEntity,TypeEmployeeEntity])
  ],
  controllers: [TypeEmployeeController],
  providers: [TypeEmployeeService]
})
export class TypeEmployeeModule {}
