import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterCodeDto } from '../register-codes/dto/register-code.dto';
import { EmailAuthDto } from './dto/email-auth.dto';
import { ResetPasswordAuthDto } from './dto/reset-password-auth.dto';
import { UserAutenticatedGuard } from 'src/utils/guards/user-autenticated/user-autenticated.guard';
import { UserReq } from 'src/utils/decorators/user-req/user-req.decorator';
import { UserDocument } from 'src/users/model/user.schema';
import { ProfileAuthDto } from './dto/profile-auth.dto';
import { ProfilePasswordAuthDto } from './dto/profile-password-auth.dto';

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
    requestRegisterCode(@Body() emailAuthDto: EmailAuthDto) {
        return this.authService.requestRegisterCode(emailAuthDto.email);
    }

    @Post('forgot-password')
    forgotPassword(@Body() emailAuthDto: EmailAuthDto) {
        return this.authService.forgotPassword(emailAuthDto.email);
    }

    @Post('validate-code')
    validateRegisterCode(@Body() registerCode: RegisterCodeDto) {
        return this.authService.validateRegisterCode(registerCode.code);
    }

    @Post('reset-password/:code')
    resetPassword(@Param('code') code: string, 
                  @Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
        return this.authService.resetPassword(code, resetPasswordAuthDto.password);
    }

    @UseGuards(UserAutenticatedGuard)
    @Get('user')
    getAutenticatedUser(@UserReq() user: UserDocument) {
        return user;
    }

    @Patch('/profile')
    @UseGuards(UserAutenticatedGuard)
    updateProfile(@UserReq() user: UserDocument,
                  @Body() profileAuthDto: ProfileAuthDto) {
        return this.authService.updateProfile(user, profileAuthDto);
    }

    @Patch('/update-password')
    @UseGuards(UserAutenticatedGuard)
    updateProfilePassword(@UserReq() user: UserDocument,
                          @Body() profilePasswordAuthDto: ProfilePasswordAuthDto) {
        return this.authService.updateProfilePassword(user, profilePasswordAuthDto);
    }

}
