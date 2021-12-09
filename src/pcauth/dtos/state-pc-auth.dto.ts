import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StatePcAuthDto {

    @ApiProperty()
    @IsNotEmpty()
    enabled:boolean;

}