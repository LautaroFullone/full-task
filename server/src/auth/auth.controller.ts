import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterCodeDto } from '../register-codes/dto/register-code.dto';
import { RequestCodeAuthDto } from './dto/request-code-auth.dto';
import { ResetPasswordAuthDto } from './dto/reset-password-auth.dto';
import { UserAutenticatedGuard } from 'src/utils/guards/user-autenticated/user-autenticated.guard';
import { UserReq } from 'src/utils/decorators/user-req/user-req.decorator';
import { UserDocument } from 'src/users/model/user.schema';

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

    @Post('forgot-password')
    forgotPassword(@Body() requestCode: RequestCodeAuthDto) {
        return this.authService.forgotPassword(requestCode.email);
    }

    @Post('validate-code')
    validateRegisterCode(@Body() registerCode: RegisterCodeDto) {
        return this.authService.validateRegisterCode(registerCode.code);
    }

    @Post('reset-password/:code')
    resetPassword(@Param('code') code: string, @Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
        return this.authService.resetPassword(code, resetPasswordAuthDto.password);
    }

    @UseGuards(UserAutenticatedGuard)
    @Get('user')
    getAutenticatedUser(@UserReq() user: UserDocument) {
        return user;
    }
 }
