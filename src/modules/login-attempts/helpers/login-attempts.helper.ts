import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LoginAttemptsHelper {
    constructor(private readonly prisma: PrismaService) { }

    async validateUserExists(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
    }

    async validateOfficeExists(officeId: string) {
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });

        if (!office) {
            throw new NotFoundException(`Office with ID ${officeId} not found`);
        }
    }

    async validateLoginAttemptExists(id: string) {
        const loginAttempt = await this.prisma.loginAttempt.findUnique({
            where: { id },
        });

        if (!loginAttempt) {
            throw new NotFoundException(`Login attempt with ID ${id} not found`);
        }
        return loginAttempt;
    }
}
