import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUnitedDto } from './create-united.dto';

export class EditUnitedDto extends PartialType(CreateUnitedDto) {
    
    @ApiPropertyOptional()
    enabled?:boolean;

    @ApiPropertyOptional()
    unitedId?:number;

}