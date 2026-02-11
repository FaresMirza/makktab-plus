import { Injectable, Logger } from '@nestjs/common';
import { OtpHelper } from './helpers/otp.helper';
import { OTP_MESSAGES } from './constants/otp.constants';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpChannel } from 'prisma/src/generated/prisma-client/client';
import { UsersRepository } from '../users/queries/users.queries';

@Injectable()
export class OtpService {
    private readonly logger = new Logger(OtpService.name);

    constructor(
        private readonly otpHelper: OtpHelper,
        private readonly usersRepository: UsersRepository,
    ) { }

    /**
     * Send OTP workflow:
     *  1. Validate user exists
     *  2. Check user lock status
     *  3. Enforce rate limiting
     *  4. Expire previous PENDING OTPs
     *  5. Generate & hash OTP
     *  6. Save OTP record
     *  7. Send notification (mock)
     */
    async sendOtp(dto: SendOtpDto, ip?: string, userAgent?: string) {
        const { email, purpose, channel } = dto;
        const resolvedChannel = channel || OtpChannel.EMAIL;

        const user = await this.otpHelper.validateUserByEmail(email);

        await this.otpHelper.checkAndHandleUserLock(user);

        await this.otpHelper.enforceRateLimit(user.id);

        await this.otpHelper.expirePreviousPendingOtps(user.id, purpose);

        const { rawCode, codeHash } = await this.otpHelper.generateOtp();

        await this.otpHelper.saveOtpRecord(user, purpose, resolvedChannel, codeHash, ip, userAgent);

        await this.otpHelper.sendOtpNotification(user.email, rawCode, resolvedChannel);

        this.logger.log(`OTP sent for user ${user.id} (purpose: ${purpose})`);

        return { message: OTP_MESSAGES.OTP_SENT };
    }

    /**
     * Verify OTP workflow:
     *  1. Validate user exists
     *  2. Validate & verify OTP (expiry, attempts, bcrypt compare, lock/unlock)
     */
    async verifyOtp(dto: VerifyOtpDto, ip?: string, userAgent?: string) {
        const { email, otp, purpose } = dto;

        const user = await this.usersRepository.findByEmail(email);

        this.otpHelper.ensureUserNotBlocked(user);

        const result = await this.otpHelper.validateAndVerifyOtp(user, otp, purpose);

        this.logger.log(`OTP verified for user ${result.userId} (purpose: ${result.purpose})`);

        return {
            message: OTP_MESSAGES.OTP_VERIFIED,
            userId: result.userId,
            purpose: result.purpose,
        };
    }
}
