import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProfessionDto } from './create-profession.dto';

export class EditProfessionDto extends PartialType(CreateProfessionDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}