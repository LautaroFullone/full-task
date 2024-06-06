import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerBody: RegisterAuthDto) {
    return this.authService.handleRegister(registerBody);
  }

  @Post('login')
  login(@Body() loginBody: LoginAuthDto) {
    return this.authService.handleLogin(loginBody);
  }
}
