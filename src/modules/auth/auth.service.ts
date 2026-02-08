import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetPasswordOtpDto } from './dto/verify-reset-password-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthHelper } from './helpers/auth.helper';
import { AuthRepository } from './queries/auth.queries';
import { OtpPurpose, OtpChannel, LoginMethod } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelper: AuthHelper,
        private readonly authRepository: AuthRepository,
    ) { }


    /**
     * Step 1: Login - Validate credentials and send OTP
     * - Validates username and password
     * - Checks for account lockout
     * - Generates OTP code
     * - Stores OTP in database
     * - Returns success message (OTP will be sent via email/SMS service later)
     */
    async login(loginDto: LoginDto, metadata?: { ip?: string; userAgent?: string; deviceFingerprint?: string }) {
        const { username, password } = loginDto;

        // Find user by username
        const user = await this.authHelper.validateUserExistsByUsername(username);

        // Check if account is locked out
        await this.authHelper.checkLoginLockout(user.id);

        // Verify password
        const isPasswordValid = await this.authHelper.verifyPassword(password, user.passwordHash);

        // Get user's office ID
        const officeId = this.authHelper.getUserOfficeId(user);

        if (!isPasswordValid) {
            // Record failed login attempt
            await this.authRepository.createLoginAttempt({
                userId: user.id,
                officeId,
                success: false,
                method: LoginMethod.PASSWORD,
                failReason: 'Invalid password',
                ...metadata,
            });

            this.authHelper.throwInvalidCredentials();
        }

        // Password is valid - now generate and send OTP
        const otpCode = this.authHelper.generateOtpCode();
        const otpHash = await this.authHelper.hashOtpCode(otpCode);

        // Store OTP in database
        await this.authRepository.createOtpCode({
            userId: user.id,
            officeId,
            purpose: OtpPurpose.LOGIN,
            channel: OtpChannel.EMAIL,
            codeHash: otpHash,
            expiresAt: this.authHelper.getOtpExpiryTime(),
            emailSnapshot: user.email,
            phoneSnapshot: user.phone,
            ...metadata,
        });

        // TODO: Send OTP via email service
        // For now, return the OTP in development (remove this in production)
        return {
            message: 'Credentials verified. Login OTP has been sent to your email',
            // Remove this in production - only for testing
            otp: otpCode,
            email: user.email,
        };
    }

    /**
     * Step 2: Verify Login OTP
     * - Validates user exists
     * - Verifies OTP code
     * - Records successful login attempt
     * - Marks OTP as used
     * - Returns user data (excluding password)
     */
    async verifyLoginOtp(verifyLoginOtpDto: VerifyLoginOtpDto, metadata?: { ip?: string; userAgent?: string; deviceFingerprint?: string }) {
        const { email, otp } = verifyLoginOtpDto;

        // Find user by email
        const user = await this.authHelper.validateUserExistsByEmail(email);

        // Get user's office ID
        const officeId = this.authHelper.getUserOfficeId(user);

        // Validate OTP
        const otpRecord = await this.authHelper.validateOtp(user.id, otp, OtpPurpose.LOGIN);

        // Mark OTP as used
        await this.authRepository.markOtpAsUsed(otpRecord.id);

        // Record successful login attempt
        await this.authRepository.createLoginAttempt({
            userId: user.id,
            officeId,
            success: true,
            method: LoginMethod.OTP,
            ...metadata,
        });

        // Return user without password
        return {
            message: 'Login successful',
            user: this.authHelper.formatUser(user),
        };
    }

    /**
     * Step 1: Forgot Password - Send OTP
     * - Validates user exists
     * - Generates OTP code
     * - Stores OTP in database
     * - Returns success message (OTP will be sent via email/SMS service later)
     */
    async forgotPassword(forgotPasswordDto: ForgotPasswordDto, metadata?: { ip?: string; userAgent?: string; deviceFingerprint?: string }) {
        const { email } = forgotPasswordDto;

        // Find user by email
        const user = await this.authHelper.validateUserExistsByEmail(email);

        // Get user's office ID
        const officeId = this.authHelper.getUserOfficeId(user);

        // Generate OTP code
        const otpCode = this.authHelper.generateOtpCode();
        const otpHash = await this.authHelper.hashOtpCode(otpCode);

        // Store OTP in database
        await this.authRepository.createOtpCode({
            userId: user.id,
            officeId,
            purpose: OtpPurpose.RESET_PASSWORD,
            channel: OtpChannel.EMAIL,
            codeHash: otpHash,
            expiresAt: this.authHelper.getOtpExpiryTime(),
            emailSnapshot: user.email,
            phoneSnapshot: user.phone,
            ...metadata,
        });

        // TODO: Send OTP via email service
        // For now, return the OTP in development (remove this in production)
        return {
            message: 'Password reset OTP has been sent to your email',
            // Remove this in production - only for testing
            otp: otpCode,
            email: user.email,
        };
    }

    /**
     * Step 2: Verify Reset Password OTP
     * - Validates user exists
     * - Verifies OTP code
     * - Marks OTP as used
     * - Returns success message
     */
    async verifyForgotPasswordOtp(verifyResetPasswordOtpDto: VerifyResetPasswordOtpDto) {
        const { email, otp } = verifyResetPasswordOtpDto;

        // Find user by email
        const user = await this.authHelper.validateUserExistsByEmail(email);

        // Validate OTP
        const otpRecord = await this.authHelper.validateOtp(user.id, otp, OtpPurpose.RESET_PASSWORD);

        // Mark OTP as used
        await this.authRepository.markOtpAsUsed(otpRecord.id);

        return {
            message: 'OTP verified successfully. You can now reset your password.',
            email: user.email,
        };
    }

    /**
     * Step 3: Reset Password
     * - Validates user exists
     * - Updates password
     * Note: OTP should be verified in Step 2 before calling this
     */
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const { email, newPassword } = resetPasswordDto;

        // Find user by email
        const user = await this.authHelper.validateUserExistsByEmail(email);

        // Hash new password
        const newPasswordHash = await this.authHelper.hashPassword(newPassword);

        // Update password
        await this.authRepository.updatePassword(user.id, newPasswordHash);

        return {
            message: 'Password has been reset successfully',
        };
    }

    /**
     * Verify OTP code
     * - Validates user exists
     * - Verifies OTP code
     * - Marks OTP as used
     * - Can be used for various purposes (login, password reset, etc.)
     */
    async verifyOtp(verifyOtpDto: VerifyOtpDto) {
        const { email, otp, purpose } = verifyOtpDto;

        // Find user by email
        const user = await this.authHelper.validateUserExistsByEmail(email);

        // Validate OTP
        const otpRecord = await this.authHelper.validateOtp(user.id, otp, purpose);

        // Mark OTP as used
        await this.authRepository.markOtpAsUsed(otpRecord.id);

        return {
            message: 'OTP verified successfully',
            user: this.authHelper.formatUser(user),
        };
    }
}
