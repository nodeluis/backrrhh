import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class EditEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}