import { OtpStatus, OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';

/**
 * OTP Entity — typed representation of the OtpCode Prisma model.
 * Used for type-safety in service/helper layers without coupling to Prisma directly.
 */
export class OtpEntity {
    id: string;
    userId: string;
    officeId: string;
    email: string;
    purpose: OtpPurpose;
    channel: OtpChannel;
    codeHash: string;
    attempts: number;
    maxAttempts: number;
    status: OtpStatus;
    deviceFingerprint?: string | null;
    ip?: string | null;
    userAgent?: string | null;
    emailSnapshot?: string | null;
    phoneSnapshot?: string | null;
    expiresAt: Date;
    usedAt?: Date | null;
    createdAt: Date;
}
