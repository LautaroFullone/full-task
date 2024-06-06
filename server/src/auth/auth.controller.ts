import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterCodeDto } from '../register-codes/dto/register-code.dto';
import { RequestCodeAuthDto } from './dto/request-code-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() registerBody: RegisterAuthDto) {
        return this.authService.register(registerBody);
    }

    @Post('login')
    login(@Body() loginBody: LoginAuthDto) {
        return this.authService.login(loginBody);
    }

    @Post('confirm-account')
    confirmAccount(@Body() registerCode: RegisterCodeDto) {
        return this.authService.confirmAccount(registerCode.code);
    }

    @Post('request-code')
    requestRegisterCode(@Body() requestCode: RequestCodeAuthDto) {
        return this.authService.requestRegisterCode(requestCode.email);
    }
 }
