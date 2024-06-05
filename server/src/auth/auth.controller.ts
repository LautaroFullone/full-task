import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/dto/register-auth.dto';
import { LoginAuthDto } from 'src/dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerBody: RegisterAuthDto) {
    return this.authService.handleRegister(registerBody);
  }

  @Post('login')
  login(@Body() loginBody: LoginAuthDto) {
    return this.authService.handleLogin(loginBody);
  }
}
