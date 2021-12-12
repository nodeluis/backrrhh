import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateReasonDto } from './create-reason.dto';

export class EditReasonDto extends PartialType(CreateReasonDto) {}