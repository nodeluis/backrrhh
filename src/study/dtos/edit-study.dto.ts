import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStudyDto } from './create-study.dto';

export class EditStudyDto extends PartialType(CreateStudyDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}