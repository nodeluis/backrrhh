import { PartialType } from '@nestjs/swagger';
import { CreateTickeoDto } from './create-tickeo.dto';

export class EditTickeoDto extends PartialType(CreateTickeoDto) {}