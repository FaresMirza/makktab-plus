import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { RegistrationRepository } from '../queries/registration.queries';
import { AUTH_MESSAGES, AUTH_CONSTANTS } from '../constants/messages.constant';

@Injectable()
export class RegistrationHelper {
    constructor(private readonly registrationRepository: RegistrationRepository) { }

    async validateUsernameUnique(username: string) {
        const inUsers = await this.registrationRepository.usernameExistsInUsers(username);
        if (inUsers) {
            throw new ConflictException(AUTH_MESSAGES.USERNAME_TAKEN);
        }
        const inRequests = await this.registrationRepository.usernameExistsInRequests(username);
        if (inRequests) {
            throw new ConflictException(AUTH_MESSAGES.USERNAME_TAKEN);
        }
    }

    async validateEmailUnique(email: string) {
        const inUsers = await this.registrationRepository.emailExistsInUsers(email);
        if (inUsers) {
            throw new ConflictException(AUTH_MESSAGES.EMAIL_TAKEN);
        }
        const inRequests = await this.registrationRepository.emailExistsInRequests(email);
        if (inRequests) {
            throw new ConflictException(AUTH_MESSAGES.EMAIL_TAKEN);
        }
    }

    async validateRegistrationNumberUnique(registrationNumber: string) {
        const inOffices = await this.registrationRepository.registrationNumberExistsInOffices(registrationNumber);
        if (inOffices) {
            throw new ConflictException('An office with this registration number already exists.');
        }

        const inRequests = await this.registrationRepository.registrationNumberExistsInRequests(registrationNumber);
        if (inRequests) {
            throw new ConflictException('A pending office request already uses this registration number.');
        }
    }

    async generateVerificationCode(): Promise<{ rawCode: string; codeHash: string }> {
        const code = randomInt(100000, 999999).toString();
        const codeHash = await bcrypt.hash(code, AUTH_CONSTANTS.SALT_ROUNDS);
        return { rawCode: code, codeHash };
    }

    async verifyCode(rawCode: string, hash: string): Promise<boolean> {
        return bcrypt.compare(rawCode, hash);
    }
}
