import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateFingerPrintDto } from './create-finger-print.dto';

export class EditFingerPrintDto extends PartialType(CreateFingerPrintDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}