import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateHourHandDto } from './create-hour-hand.dto';

export class EditHourHandDto extends PartialType(CreateHourHandDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}