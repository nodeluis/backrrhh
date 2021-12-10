import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePcAuthDto } from './create-pc-auth.dto';

export class EditPcAuthDto extends PartialType(CreatePcAuthDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}