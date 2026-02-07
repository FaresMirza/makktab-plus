import { PrismaService } from '../prisma/prisma.service';
import { CreateLoginAttemptDto } from './dto/create-login-attempt.dto';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';
export declare class LoginAttemptsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLoginAttemptDto: CreateLoginAttemptDto): Promise<{
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    }>;
    findAll(): Promise<({
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    findOne(id: string): Promise<{
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    }>;
    findByUser(userId: string): Promise<({
        office: {
            id: string;
            name: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    findByOffice(officeId: string): Promise<({
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    findFailed(): Promise<({
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    findSuccessful(): Promise<({
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    findByMethod(method: LoginMethod): Promise<({
        office: {
            id: string;
            name: string;
        };
        user: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        officeId: string;
        id: string;
        createdAt: Date;
        userId: string;
        deviceFingerprint: string | null;
        ip: string | null;
        userAgent: string | null;
        success: boolean;
        method: LoginMethod;
        geo: string | null;
        failReason: string | null;
    })[]>;
    getUserStatistics(userId: string): Promise<{
        userId: string;
        statistics: {
            total: number;
            successful: number;
            failed: number;
            successRate: string;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
