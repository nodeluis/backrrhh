import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateHourDto } from './create-hour.dto';

export class EditHourDto extends PartialType(CreateHourDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}