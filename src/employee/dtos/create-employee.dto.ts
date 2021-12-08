import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {

    @ApiProperty()
    @IsNotEmpty()
    ci:string;

    @ApiProperty()
    @IsNotEmpty()
    civilStatus:string;

    @ApiProperty()
    @IsNotEmpty()
    dateOfAdmission:Date;

    @ApiProperty()
    @IsNotEmpty()
    dateOfBirth:Date;

    @ApiProperty()
    @IsNotEmpty()
    employedName:string;

    @ApiProperty()
    @IsNotEmpty()
    enabled:boolean;

    @ApiProperty()
    @IsNotEmpty()
    gender:string;

    @ApiProperty()
    @IsNotEmpty()
    lastName1:string;

    @ApiProperty()
    @IsNotEmpty()
    lastName2:string;

    @ApiProperty()
    @IsNotEmpty()
    mobile:string;

    @ApiProperty()
    @IsNotEmpty()
    nit:number;

    @ApiProperty()
    @IsNotEmpty()
    description:string;

    @ApiPropertyOptional()
    photography?:string;

    @ApiProperty()
    @IsNotEmpty()
    placeOfBirth:string;

    @ApiProperty()
    @IsNotEmpty()
    qr:string;

}