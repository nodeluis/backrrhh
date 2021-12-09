import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StateEmployeeDto {

    @ApiProperty()
    @IsNotEmpty()
    enabled:boolean;

}