import { OtpCodesService } from './otp-codes.service';
import { CreateOtpCodeDto } from './dto/create-otp-code.dto';
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';
export declare class OtpCodesController {
    private readonly otpCodesService;
    constructor(otpCodesService: OtpCodesService);
    create(createOtpCodeDto: CreateOtpCodeDto): Promise<{
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            phone: string;
            id: string;
        };
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        purpose: OtpPurpose;
        channel: import("prisma/src/generated/prisma-client/client").OtpChannel;
        attempts: number;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        emailSnapshot: string | null;
        phoneSnapshot: string | null;
        expiresAt: Date;
        usedAt: Date | null;
    }>;
    verify(verifyOtpCodeDto: VerifyOtpCodeDto): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(userId?: string, purpose?: OtpPurpose): Promise<({
        office: {
            id: string;
            name: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        purpose: OtpPurpose;
        channel: import("prisma/src/generated/prisma-client/client").OtpChannel;
        attempts: number;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        emailSnapshot: string | null;
        phoneSnapshot: string | null;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
    })[]>;
    findExpired(): Promise<({
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        purpose: OtpPurpose;
        channel: import("prisma/src/generated/prisma-client/client").OtpChannel;
        attempts: number;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        emailSnapshot: string | null;
        phoneSnapshot: string | null;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            phone: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        purpose: OtpPurpose;
        channel: import("prisma/src/generated/prisma-client/client").OtpChannel;
        attempts: number;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        emailSnapshot: string | null;
        phoneSnapshot: string | null;
        codeHash: string;
        expiresAt: Date;
        usedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
