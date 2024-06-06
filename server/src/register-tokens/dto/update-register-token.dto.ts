import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterTokenDto } from './create-register-token.dto';

export class UpdateRegisterTokenDto extends PartialType(CreateRegisterTokenDto) {}
