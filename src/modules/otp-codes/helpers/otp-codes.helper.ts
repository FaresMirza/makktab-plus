import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OtpCodesHelper {
    constructor(private readonly prisma: PrismaService) { }

    async validateUserExists(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    async validateOfficeExists(officeId: string) {
        const office = await this.prisma.office.findUnique({
            where: { id: officeId },
        });

        if (!office) {
            throw new NotFoundException(`Office with ID ${officeId} not found`);
        }
    }

    async validateOtpCodeExists(id: string) {
        const otpCode = await this.prisma.otpCode.findUnique({
            where: { id },
        });

        if (!otpCode) {
            throw new NotFoundException(`OTP code with ID ${id} not found`);
        }
        return otpCode;
    }

    async hashCode(code: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(code, saltRounds);
    }

    async verifyCode(code: string, hash: string): Promise<boolean> {
        return bcrypt.compare(code, hash);
    }

    calculateExpiration(): Date {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        return expiresAt;
    }
}
