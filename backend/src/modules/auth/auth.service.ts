import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from './helpers/auth.helper';
import { RegistrationHelper } from './helpers/registration.helper';
import { AUTH_MESSAGES, AUTH_CONSTANTS } from './constants/messages.constant';
import { UsersRepository } from '../users/queries/users.queries';
import { OtpService } from '../otps/otps.service';
import { EmailService } from '../email/email.service';
import { RegistrationRepository } from './queries/registration.queries';
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
import { OtpPurpose, OtpChannel, UserStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly authHelper: AuthHelper,
        private readonly registrationHelper: RegistrationHelper,
        private readonly usersRepository: UsersRepository,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService,
        private readonly registrationRepository: RegistrationRepository,
        private readonly emailService: EmailService,
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

        if (user.status.toUpperCase() !== 'ACTIVE') {
            throw new UnauthorizedException('Your account is currently suspended or deactivated. Please contact the administrator.');
        }

        // Check if user's office is suspended (skip for platform admins)
        if (!user.roles?.includes('admin') && !user.roles?.includes('super_admin')) {
            // Check employee offices
            if (user.offices && user.offices.length > 0) {
                const suspendedOffice = user.offices.find(office => office.status.toUpperCase() !== 'ACTIVE');
                if (suspendedOffice) {
                    throw new UnauthorizedException('Your office account is currently suspended. Please contact platform administration.');
                }
            }
            // Check owned office
            if (user.ownedOffice && user.ownedOffice.status.toUpperCase() !== 'ACTIVE') {
                throw new UnauthorizedException('Your office account is currently suspended. Please contact platform administration.');
            }
        }

        await this.authHelper.validatePassword(loginDto.password, user, ip, userAgent);

        const otpResult = await this.otpService.sendOtp(
            { email: user.email, purpose: OtpPurpose.LOGIN, channel: OtpChannel.EMAIL },
            ip,
            userAgent,
        );

        return { message: AUTH_MESSAGES.OTP_SENT, otp: otpResult.otp };
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

        // Check user status
        if (user.status.toUpperCase() !== 'ACTIVE') {
            throw new UnauthorizedException('Your account is currently suspended or deactivated. Please contact the administrator.');
        }

        // Check if user's office is suspended (skip for platform admins)
        if (!user.roles?.includes('admin') && !user.roles?.includes('super_admin')) {
            // Check employee offices
            if (user.offices && user.offices.length > 0) {
                const suspendedOffice = user.offices.find(office => office.status.toUpperCase() !== 'ACTIVE');
                if (suspendedOffice) {
                    throw new UnauthorizedException('Your office account is currently suspended. Please contact platform administration.');
                }
            }
            // Check owned office
            if (user.ownedOffice && user.ownedOffice.status.toUpperCase() !== 'ACTIVE') {
                throw new UnauthorizedException('Your office account is currently suspended. Please contact platform administration.');
            }
        }

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

        let otp: string | undefined;
        if (user) {
            const otpResult = await this.otpService.sendOtp(
                { email: user.email, purpose: OtpPurpose.RESET_PASSWORD, channel: OtpChannel.EMAIL },
                ip,
                userAgent,
            );
            otp = otpResult.otp;
        }

        return { message: AUTH_MESSAGES.OTP_SENT, otp };
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
     * Resend a FIRST_LOGIN OTP. Only valid while the user is still PENDING.
     */
    async resendFirstLoginOtp(dto: FirstLoginResendDto, ip: string, userAgent: string) {
        const usernameOrEmail = dto.username;

        const user = await this.usersRepository.findByUsername(usernameOrEmail)
            || await this.usersRepository.findByEmail(usernameOrEmail);

        // Respond identically whether or not the user is eligible to avoid
        // leaking which usernames have pending first-login state.
        if (!user || user.status !== UserStatus.PENDING) {
            return { message: AUTH_MESSAGES.OTP_SENT };
        }

        const otpResult = await this.otpService.sendOtp(
            { email: user.email, purpose: OtpPurpose.FIRST_LOGIN, channel: OtpChannel.EMAIL },
            ip,
            userAgent,
        );

        return { message: AUTH_MESSAGES.OTP_SENT, otp: otpResult.otp };
    }

    /**
     * Complete first-login: verify the FIRST_LOGIN OTP, set the user's
     * chosen password, and activate the account.
     */
    async verifyFirstLogin(dto: FirstLoginVerifyDto, ip: string, userAgent: string, deviceFingerprint: string) {
        const { username, otp, newPassword, confirmPassword } = dto;

        if (newPassword !== confirmPassword) {
            throw new BadRequestException(AUTH_MESSAGES.PASSWORDS_DO_NOT_MATCH);
        }

        const user = await this.usersRepository.findByUsername(username)
            || await this.usersRepository.findByEmail(username);
        if (!user) {
            throw new BadRequestException(AUTH_MESSAGES.INVALID_REQUEST);
        }

        if (user.status !== UserStatus.PENDING) {
            throw new BadRequestException(AUTH_MESSAGES.FIRST_LOGIN_NOT_PENDING);
        }

        await this.otpService.verifyOtp(
            { email: user.email, otp, purpose: OtpPurpose.FIRST_LOGIN },
            ip,
            userAgent,
        );

        const passwordHash = await this.authHelper.hashPassword(newPassword);
        await this.usersRepository.updatePassword(user.id, passwordHash);
        await this.usersRepository.update(user.id, { status: UserStatus.ACTIVE });

        await this.authHelper.logAudit({
            userId: user.id,
            event: 'PASSWORD_CHANGED',
            ip,
            userAgent,
            deviceFingerprint,
        });

        return { message: AUTH_MESSAGES.FIRST_LOGIN_COMPLETED };
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
        const payload = { sub: user.publicId, username: user.username, fullName: user.fullName, roles: user.roles };
        const accessToken = await this.jwtService.signAsync(payload);

        return { access_token: accessToken };
    }

    async register(dto: RegisterDto, ip: string, userAgent: string) {
        await this.registrationHelper.validateUsernameUnique(dto.username);
        await this.registrationHelper.validateEmailUnique(dto.email);

        const passwordHash = await this.authHelper.hashPassword(dto.password);
        const { rawCode, codeHash } = await this.registrationHelper.generateVerificationCode();

        const expiresAt = new Date(Date.now() + AUTH_CONSTANTS.OTP_EXPIRY_MINUTES * AUTH_CONSTANTS.MILLISECONDS_PER_MINUTE);

        await this.registrationRepository.createOfficeRequest({
            officeName: dto.officeName,
            fullName: dto.ownerFullName,
            email: dto.email,
            phone: dto.phone,
            username: dto.username,
            city: dto.city,
            passwordHash,
            verificationCodeHash: codeHash,
            verificationExpiresAt: expiresAt,
        });

        // Email the verification code to the registering user.
        await this.emailService.send({
            to: dto.email,
            subject: 'رمز تحقق تسجيل المكتب — Makktab Plus',
            text:
                `مرحباً ${dto.ownerFullName},\n\n` +
                `رمز التحقق الخاص بطلب تسجيل مكتبك هو: ${rawCode}\n\n` +
                `الرمز صالح لمدة ${AUTH_CONSTANTS.OTP_EXPIRY_MINUTES} دقيقة.\n\n` +
                `إن لم تكن قد طلبت ذلك يمكنك تجاهل هذه الرسالة.`,
            html:
                `<div style="font-family:'Segoe UI',Tahoma,sans-serif;direction:rtl;color:#111;line-height:1.6">` +
                `<p>مرحباً <strong>${dto.ownerFullName}</strong>,</p>` +
                `<p>رمز التحقق الخاص بطلب تسجيل مكتبك:</p>` +
                `<p style="font-size:28px;font-weight:700;letter-spacing:6px;background:#0a0a0a;color:#fff;padding:14px 18px;border-radius:8px;display:inline-block">${rawCode}</p>` +
                `<p>الرمز صالح لمدة ${AUTH_CONSTANTS.OTP_EXPIRY_MINUTES} دقيقة.</p>` +
                `<p style="color:#666;font-size:12px">إن لم تكن قد طلبت ذلك يمكنك تجاهل هذه الرسالة.</p>` +
                `</div>`,
        });

        return { message: AUTH_MESSAGES.REGISTRATION_SUCCESS };
    }

    async verifyRegistration(dto: VerifyRegisterDto, ip: string, userAgent: string) {
        const request = await this.registrationRepository.findPendingRequestByEmail(dto.email);
        if (!request) {
            throw new BadRequestException(AUTH_MESSAGES.NO_PENDING_REQUEST);
        }

        if (request.verificationExpiresAt && new Date() > request.verificationExpiresAt) {
            throw new BadRequestException(AUTH_MESSAGES.VERIFICATION_EXPIRED);
        }

        if (request.verificationAttempts >= AUTH_CONSTANTS.MAX_OTP_ATTEMPTS) {
            throw new BadRequestException(AUTH_MESSAGES.VERIFICATION_MAX_ATTEMPTS);
        }

        if (!request.verificationCodeHash) {
            throw new BadRequestException(AUTH_MESSAGES.NO_PENDING_REQUEST);
        }

        const isValid = await this.registrationHelper.verifyCode(dto.otp, request.verificationCodeHash);
        if (!isValid) {
            await this.registrationRepository.incrementVerificationAttempts(request.id);
            throw new BadRequestException(AUTH_MESSAGES.VERIFICATION_INVALID);
        }

        await this.registrationRepository.markEmailVerified(request.id);

        return { message: AUTH_MESSAGES.EMAIL_VERIFIED };
    }
}
