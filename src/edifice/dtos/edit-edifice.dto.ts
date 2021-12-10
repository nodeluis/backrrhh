import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEdificeDto } from './create-edifice.sto';

export class EditEdificeDto extends PartialType(CreateEdificeDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}