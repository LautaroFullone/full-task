import { Module } from '@nestjs/common';
import { RegisterCodesService } from './register-codes.service';
import { RegisterCodesController } from './register-codes.controller';

@Module({
  controllers: [RegisterCodesController],
  providers: [RegisterCodesService],
})
export class RegisterCodesModule {}
