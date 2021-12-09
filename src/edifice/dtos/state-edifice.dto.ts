import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StateEdificeDto {

    @ApiProperty()
    @IsNotEmpty()
    enabled:boolean;

}