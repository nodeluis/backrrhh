import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProfessionDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    grade:number;

    @ApiProperty()
    @IsNotEmpty()
    abbreviation:string;

}