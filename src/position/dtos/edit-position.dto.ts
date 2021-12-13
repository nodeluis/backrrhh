import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';

export class EditPositionDto extends PartialType(CreatePositionDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}