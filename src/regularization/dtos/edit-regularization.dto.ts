import { PartialType } from '@nestjs/swagger';
import { CreateRegularizationDto } from './create-regularization.dto';

export class EditRegularizationDto extends PartialType(CreateRegularizationDto) {}