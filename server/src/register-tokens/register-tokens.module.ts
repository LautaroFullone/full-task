import { Module } from '@nestjs/common';
import { RegisterTokensService } from './register-tokens.service';
import { RegisterTokensController } from './register-tokens.controller';

@Module({
  controllers: [RegisterTokensController],
  providers: [RegisterTokensService],
})
export class RegisterTokensModule {}
