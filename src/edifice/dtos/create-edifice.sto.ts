import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEdificeDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    direction:string;

    @ApiProperty()
    @IsNotEmpty()
    lat:string;

    @ApiProperty()
    @IsNotEmpty()
    lgn:string;

    @ApiProperty()
    @IsNotEmpty()
    online:boolean;

}