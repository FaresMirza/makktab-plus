import { Controller, Post, Body, Ip, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetPasswordOtpDto } from './dto/verify-reset-password-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Step 1: Login - Validate credentials and send OTP
     * Validates username and password, then sends OTP to email
     * POST /auth/login
     */
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
    ) {
        return this.authService.login(loginDto, {
            ip,
            userAgent,
        });
    }

    /**
     * Step 2: Verify Login OTP
     * POST /auth/verify-login-otp
     */
    @Post('verify-login-otp')
    async verifyLoginOtp(
        @Body() verifyLoginOtpDto: VerifyLoginOtpDto,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
    ) {
        return this.authService.verifyLoginOtp(verifyLoginOtpDto, {
            ip,
            userAgent,
        });
    }

    /**
     * Step 1: Forgot Password - Send OTP
     * POST /auth/forgot-password
     */
    @Post('forgot-password')
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordDto,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
    ) {
        return this.authService.forgotPassword(forgotPasswordDto, {
            ip,
            userAgent,
        });
    }

    /**
     * Step 2: Verify Reset Password OTP
     * POST /auth/verify-reset-password-otp
     */
    @Post('verify-forgot-password-otp')
    async verifyForgotPasswordOtp(@Body() verifyForgotPasswordOtpDto: VerifyResetPasswordOtpDto) {
        return this.authService.verifyForgotPasswordOtp(verifyForgotPasswordOtpDto);
    }

    /**
     * Step 3: Reset Password
     * POST /auth/reset-password
     */
    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

 


}
