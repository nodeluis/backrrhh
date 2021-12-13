import { PartialType } from '@nestjs/swagger';
import { CreateTypeAfiliationDto } from './create-type-afiliation.dto';

export class EditTypeAfiliationDto extends PartialType(CreateTypeAfiliationDto) {}