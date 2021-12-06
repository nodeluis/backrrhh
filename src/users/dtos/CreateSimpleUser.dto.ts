import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {

  @ApiProperty()
  @IsEmail()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

}