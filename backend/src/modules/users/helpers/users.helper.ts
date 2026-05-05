import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../queries/users.queries';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersHelper {
    constructor(private readonly usersRepository: UsersRepository) { }

    /**
     * Validate that username is unique
     * excludeUserPublicId is the publicId of the user being updated (to allow keeping their own username)
     */
    async validateUsernameUnique(username: string, excludeUserPublicId?: string) {
        if (!username) return;

        const user = await this.usersRepository.findByUsernameSimple(username);

        if (user && user.publicId !== excludeUserPublicId) {
            throw new ConflictException('Username already exists');
        }
    }

    /**
     * Validate that email is unique
     * excludeUserPublicId is the publicId of the user being updated
     */
    async validateEmailUnique(email: string, excludeUserPublicId?: string) {
        if (!email) return;

        const user = await this.usersRepository.findByEmailSimple(email);

        if (user && user.publicId !== excludeUserPublicId) {
            throw new ConflictException('Email already exists');
        }
    }

    /**
     * Validate user existence by publicId
     * Returns the user entity (with internal id)
     */
    async validateUserExists(publicId: string) {
        const user = await this.usersRepository.findByPublicIdSimple(publicId);

        if (!user) {
            throw new NotFoundException(`User with ID ${publicId} not found`);
        }

        return user;
    }

    /**
     * Hash password
     */
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Verify password
     */
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * Format user response (remove passwordHash)
     */
    formatUser(user: any) {
        if (!user) return null;
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Format invalid old password exception
     */
    throwInvalidOldPassword() {
        throw new BadRequestException('Invalid old password');
    }
}
