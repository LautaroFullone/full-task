import { Controller } from '@nestjs/common';
import { RegisterCodesService } from './register-codes.service';

@Controller('register-codes')
export class RegisterCodesController {
  constructor(private readonly registerCodesService: RegisterCodesService) {}
}
