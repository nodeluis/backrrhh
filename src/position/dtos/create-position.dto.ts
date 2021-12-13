import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    requiredSkill:string;

    @ApiProperty()
    @IsNotEmpty()
    unitedId:number;
}