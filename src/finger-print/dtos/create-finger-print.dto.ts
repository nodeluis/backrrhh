import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFingerPrintDto {

    @ApiProperty()
    @IsNotEmpty()
    employeeId:number;

    @ApiProperty()
    @IsNotEmpty()
    thumb:string;

    @ApiProperty()
    @IsNotEmpty()
    index:string;

    @ApiProperty()
    @IsNotEmpty()
    middle:string;

    @ApiProperty()
    @IsNotEmpty()
    ring:string;

    @ApiProperty()
    @IsNotEmpty()
    little:string;

}