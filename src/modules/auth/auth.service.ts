import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from './helpers/auth.helper';
import { AUTH_MESSAGES } from './constants/messages.constant';
import { UsersRepository } from '../users/queries/users.queries';
import { OtpService } from '../otps/otps.service';
import { LoginDto } from './dto/login.dto';
import { VerifyLoginOtpDto } from './dto/verify-login-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordWithOtpDto } from './dto/reset-password-with-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelper: AuthHelper,
        private readonly usersRepository: UsersRepository,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto, ip: string, userAgent: string) {
        let user;
        try {
            user = await this.authHelper.validateUserExistsByUsername(loginDto.username);
        } catch (error) {
            await this.authHelper.logAudit({
                event: 'INVALID_CREDENTIALS',
                reason: 'User not found',
                ip,
                userAgent,
            });
            this.authHelper.throwInvalidCredentials();
        }

        await this.authHelper.validatePassword(loginDto.password, user, ip, userAgent);

        await this.otpService.sendOtp(
            { email: user.email, purpose: OtpPurpose.LOGIN, channel: OtpChannel.EMAIL },
            ip,
            userAgent,
        );

        return { message: AUTH_MESSAGES.OTP_SENT };
    }

    async verifyLogin(dto: VerifyLoginOtpDto, ip: string, userAgent: string, deviceFingerprint: string) {
        const { username, password, otp } = dto as any;

        let user;
        try {
            user = await this.authHelper.validateUserExistsByUsername(username);
        } catch (e) {
            await this.authHelper.logAudit({ event: 'INVALID_CREDENTIALS', reason: 'User not found during OTP verify', ip, userAgent, deviceFingerprint });
            this.authHelper.throwInvalidCredentials();
        }

        await this.authHelper.validatePassword(password, user, ip, userAgent, deviceFingerprint);

        await this.otpService.verifyOtp(
            { email: user.email, otp, purpose: OtpPurpose.LOGIN },
            ip,
            userAgent,
        );

        const tokens = await this.authHelper.generateTokens(user);

        await this.authHelper.logAudit({
            userId: user.id, // internal id for FK
            event: 'LOGIN_SUCCESS',
            ip,
            userAgent,
            deviceFingerprint,
        });

        return tokens;
    }

    async forgotPassword(dto: ForgotPasswordDto, ip: string, userAgent: string) {
        const usernameOrEmail = dto.username;

        const user = await this.usersRepository.findByUsername(usernameOrEmail)
            || await this.usersRepository.findByEmail(usernameOrEmail);

        if (user) {
            await this.otpService.sendOtp(
                { email: user.email, purpose: OtpPurpose.RESET_PASSWORD, channel: OtpChannel.EMAIL },
                ip,
                userAgent,
            );
        }

        return { message: AUTH_MESSAGES.OTP_SENT };
    }

    async verifyForgotPassword(dto: ResetPasswordWithOtpDto, ip: string, userAgent: string, deviceFingerprint: string) {
        const { username, otp, newPassword, confirmPassword } = dto;

        if (newPassword !== confirmPassword) {
            throw new BadRequestException(AUTH_MESSAGES.PASSWORDS_DO_NOT_MATCH);
        }

        const user = await this.usersRepository.findByUsername(username)
            || await this.usersRepository.findByEmail(username);
        if (!user) {
            throw new BadRequestException(AUTH_MESSAGES.INVALID_REQUEST);
        }

        this.authHelper.checkPasswordChangeAllowed(user.lastPasswordChange);

        const isSame = await this.authHelper.verifyPassword(newPassword, user.passwordHash);
        if (isSame) {
            throw new BadRequestException(AUTH_MESSAGES.SAME_PASSWORD);
        }

        await this.otpService.verifyOtp(
            { email: user.email, otp, purpose: OtpPurpose.RESET_PASSWORD },
            ip,
            userAgent,
        );

        const passwordHash = await this.authHelper.hashPassword(newPassword);
        await this.usersRepository.updatePassword(user.id, passwordHash);

        await this.authHelper.logAudit({
            userId: user.id, // internal id for FK
            event: 'PASSWORD_CHANGED',
            ip,
            userAgent,
            deviceFingerprint,
        });

        return { message: AUTH_MESSAGES.PASSWORD_CHANGED };
    }

    /**
     * Reset password for authenticated user.
     * userPublicId comes from JWT token (payload.sub = publicId).
     */
    async resetPassword(userPublicId: string, dto: ResetPasswordDto, ip: string, userAgent: string, deviceFingerprint: string) {
        const user = await this.usersRepository.findByPublicIdSimple(userPublicId);
        if (!user) throw new UnauthorizedException();

        const { newPassword } = dto;

        const isSame = await this.authHelper.verifyPassword(newPassword, user.passwordHash);
        if (isSame) {
            throw new BadRequestException(AUTH_MESSAGES.SAME_PASSWORD);
        }

        this.authHelper.checkPasswordChangeAllowed(user.lastPasswordChange);

        const passwordHash = await this.authHelper.hashPassword(newPassword);
        await this.usersRepository.updatePassword(user.id, passwordHash);

        await this.authHelper.logAudit({
            userId: user.id, // internal id for FK
            event: 'PASSWORD_RESET',
            ip,
            userAgent,
            deviceFingerprint,
        });

        return { message: AUTH_MESSAGES.PASSWORD_RESET };
    }

    /**
     * Refresh access token.
     * JWT `sub` is the user's publicId (UUID).
     */
    async refresh(dto: RefreshTokenDto, ip: string, userAgent: string) {
        let userPublicId: string;
        try {
            const payload = await this.jwtService.verifyAsync(dto.refreshToken);
            userPublicId = payload.sub;
        } catch (e) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_TOKEN_FORMAT);
        }

        const user = await this.usersRepository.findByPublicIdSimple(userPublicId);
        if (!user || !user.refreshTokenHash) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
        }

        const isValid = await this.authHelper.validateRefreshToken(dto.refreshToken, user.refreshTokenHash);
        if (!isValid) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
        }

        // Generate new access token with publicId in payload
        const payload = { sub: user.publicId, username: user.username, roles: user.roles };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
    }
}
