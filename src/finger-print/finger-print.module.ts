import { Module } from '@nestjs/common';
import { FingerPrintService } from './finger-print.service';
import { FingerPrintController } from './finger-print.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FingerPrintEntity } from 'src/models/finger-print/FingerPrint.entity';
import { EmployeeEntity } from 'src/models/employees/Employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FingerPrintEntity,EmployeeEntity])
  ],
  providers: [FingerPrintService],
  controllers: [FingerPrintController]
})
export class FingerPrintModule {}
