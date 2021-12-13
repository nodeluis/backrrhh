import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudyDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string;

}