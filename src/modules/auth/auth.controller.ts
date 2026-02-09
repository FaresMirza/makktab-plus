import { Controller, Post, Body, Ip, Req, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordWithOtpDto } from './dto/reset-password-with-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Ip() ip: string, @Req() req: any) {
        return this.authService.login(loginDto, ip, req.headers['user-agent']);
    }

    @Post('login/verify')
    async verifyLogin(
        @Body() dto: VerifyLoginOtpDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.verifyLogin(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @Post('forgot-password')
    async forgotPassword(
        @Body() dto: ForgotPasswordDto,
        @Ip() ip: string,
        @Req() req: any
    ) {
        return this.authService.forgotPassword(dto, ip, req.headers['user-agent']);
    }

    @Post('forgot-password/verify')
    async verifyForgotPassword(
        @Body() dto: ResetPasswordWithOtpDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.verifyForgotPassword(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('reset-password')
    async resetPassword(
        @Body() dto: ResetPasswordDto,
        @Req() req: any,
        @Ip() ip: string,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.resetPassword(req.user.userId, dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @Post('refresh')
    async refresh(
        @Body() dto: RefreshTokenDto,
        @Ip() ip: string,
        @Req() req: any
    ) {
        return this.authService.refresh(dto, ip, req.headers['user-agent']);
    }
}
