import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RegistrationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createOfficeRequest(data: {
        officeName: string;
        fullName: string;
        email: string;
        phone: string;
        username: string;
        city: string;
        registrationNumber: string;
        passwordHash: string;
        verificationCodeHash: string;
        verificationExpiresAt: Date;
    }) {
        return this.prisma.officeRequest.create({ data });
    }

    async findPendingRequestByEmail(email: string) {
        return this.prisma.officeRequest.findFirst({
            where: {
                email,
                emailVerified: false,
                status: null,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markEmailVerified(requestId: string) {
        return this.prisma.officeRequest.update({
            where: { id: requestId },
            data: { emailVerified: true },
        });
    }

    async incrementVerificationAttempts(requestId: string) {
        return this.prisma.officeRequest.update({
            where: { id: requestId },
            data: {
                verificationAttempts: { increment: 1 },
            },
        });
    }

    async usernameExistsInUsers(username: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        return !!user;
    }

    async usernameExistsInRequests(username: string): Promise<boolean> {
        const request = await this.prisma.officeRequest.findFirst({
            where: { username, status: null },
        });
        return !!request;
    }

    async emailExistsInUsers(email: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return !!user;
    }

    async emailExistsInRequests(email: string): Promise<boolean> {
        const request = await this.prisma.officeRequest.findFirst({
            where: { email, status: null },
        });
        return !!request;
    }

    async registrationNumberExistsInOffices(registrationNumber: string): Promise<boolean> {
        const office = await this.prisma.office.findFirst({
            where: { registrationNumber },
        });
        return !!office;
    }

    async registrationNumberExistsInRequests(registrationNumber: string): Promise<boolean> {
        const request = await this.prisma.officeRequest.findFirst({
            where: { registrationNumber, status: null },
        });
        return !!request;
    }
}
