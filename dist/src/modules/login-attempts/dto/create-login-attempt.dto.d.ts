import { LoginMethod } from 'prisma/src/generated/prisma-client/client';
export declare class CreateLoginAttemptDto {
    userId: string;
    officeId: string;
    success: boolean;
    method: LoginMethod;
    ip?: string;
    userAgent?: string;
    deviceFingerprint?: string;
    geo?: string;
    failReason?: string;
}
