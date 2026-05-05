import { Controller, Post, Body, Ip, Req, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordWithOtpDto } from './dto/reset-password-with-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyRegisterDto } from './dto/verify-register.dto';
import { FirstLoginResendDto } from './dto/first-login-resend.dto';
import { FirstLoginVerifyDto } from './dto/first-login-verify.dto';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_ROUTES } from './constants/routes.constant';

@Controller(AUTH_ROUTES.ROOT)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AUTH_ROUTES.LOGIN)
    async login(@Body() loginDto: LoginDto, @Ip() ip: string, @Req() req: any) {
        return this.authService.login(loginDto, ip, req.headers['user-agent']);
    }

    @Post(AUTH_ROUTES.LOGIN_VERIFY)
    async verifyLogin(
        @Body() dto: VerifyLoginOtpDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.verifyLogin(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @Post(AUTH_ROUTES.FORGOT_PASSWORD)
    async forgotPassword(
        @Body() dto: ForgotPasswordDto,
        @Ip() ip: string,
        @Req() req: any
    ) {
        return this.authService.forgotPassword(dto, ip, req.headers['user-agent']);
    }

    @Post(AUTH_ROUTES.FORGOT_PASSWORD_VERIFY)
    async verifyForgotPassword(
        @Body() dto: ResetPasswordWithOtpDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.verifyForgotPassword(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(AUTH_ROUTES.RESET_PASSWORD)
    async resetPassword(
        @Body() dto: ResetPasswordDto,
        @Req() req: any,
        @Ip() ip: string,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.resetPassword(req.user.userId, dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @Post(AUTH_ROUTES.FIRST_LOGIN_RESEND)
    async resendFirstLoginOtp(
        @Body() dto: FirstLoginResendDto,
        @Ip() ip: string,
        @Req() req: any
    ) {
        return this.authService.resendFirstLoginOtp(dto, ip, req.headers['user-agent']);
    }

    @Post(AUTH_ROUTES.FIRST_LOGIN_VERIFY)
    async verifyFirstLogin(
        @Body() dto: FirstLoginVerifyDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string
    ) {
        return this.authService.verifyFirstLogin(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }

    @Post(AUTH_ROUTES.REFRESH)
    async refresh(
        @Body() dto: RefreshTokenDto,
        @Ip() ip: string,
        @Req() req: any
    ) {
        return this.authService.refresh(dto, ip, req.headers['user-agent']);
    }

    @Post(AUTH_ROUTES.REGISTER)
    async register(@Body() dto: RegisterDto, @Ip() ip: string, @Req() req: any) {
        return this.authService.register(dto, ip, req.headers['user-agent']);
    }

    @Post(AUTH_ROUTES.REGISTER_VERIFY)
    async verifyRegistration(@Body() dto: VerifyRegisterDto, @Ip() ip: string, @Req() req: any) {
        return this.authService.verifyRegistration(dto, ip, req.headers['user-agent']);
    }

    /**
     * Link-based account activation (employee accounts created by an
     * office owner). Caller submits the user's publicId, the raw token
     * from the email link, and a chosen password.
     */
    @Post('activate')
    async activateAccount(
        @Body() dto: ActivateAccountDto,
        @Ip() ip: string,
        @Req() req: any,
        @Headers('x-device-fingerprint') deviceFingerprint: string,
    ) {
        return this.authService.activateAccount(dto, ip, req.headers['user-agent'], deviceFingerprint);
    }
}
