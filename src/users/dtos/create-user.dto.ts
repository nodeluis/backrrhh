import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `Se necesita algun rol como, ${EnumToString(AppRoles)}`,
  })
  roles: string[];

}