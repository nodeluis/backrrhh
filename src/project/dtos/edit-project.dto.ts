import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class EditProjectDto extends PartialType(CreateProjectDto) {
    @ApiPropertyOptional()
    enabled:boolean;
}