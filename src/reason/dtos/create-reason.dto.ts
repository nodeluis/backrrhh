import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReasonDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    type:string;

    @ApiProperty()
    @IsNotEmpty()
    regularizationId:number;

}