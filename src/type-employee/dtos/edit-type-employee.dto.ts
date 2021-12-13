import { PartialType } from '@nestjs/swagger';
import { CreateTypeEmployeeDto } from './create-type-employee.dto';

export class EditTypeEmployeeDto extends PartialType(CreateTypeEmployeeDto) {}