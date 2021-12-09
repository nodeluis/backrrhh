import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePcAuthDto {

    @ApiProperty()
    @IsNotEmpty()
    ip:string;

    @ApiProperty()
    @IsNotEmpty()
    mac:string;

    @ApiProperty()
    @IsNotEmpty()
    edificeId:number;

}