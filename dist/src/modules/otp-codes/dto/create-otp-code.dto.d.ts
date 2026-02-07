import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';
export declare class CreateOtpCodeDto {
    userId: string;
    officeId: string;
    purpose: OtpPurpose;
    channel: OtpChannel;
    code: string;
    attempts?: number;
    deviceFingerprint?: string;
    ip?: string;
    userAgent?: string;
    emailSnapshot?: string;
    phoneSnapshot?: string;
}
