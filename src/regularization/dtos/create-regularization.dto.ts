import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRegularizationDto {

    @ApiProperty()
    @IsNotEmpty()
    turn:string;

    @ApiProperty()
    @IsNotEmpty()
    detail:string;

    @ApiProperty()
    @IsNotEmpty()
    userId:number;

    @ApiProperty()
    @IsNotEmpty()
    reasonId:number;

    @ApiProperty()
    @IsNotEmpty()
    tickeoId:number;

}