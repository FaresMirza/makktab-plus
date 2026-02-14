import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { OfficesRepository } from '../queries/office.queries';
import { UsersRepository } from '../../users/queries/users.queries';

@Injectable()
export class OfficesHelper {
    constructor(
        private readonly officesRepository: OfficesRepository,
        private readonly usersRepository: UsersRepository,
    ) { }

    /**
     * Validate that a user exists by ID
     * Throws NotFoundException if user doesn't exist
     */
    async validateUserExists(userId: string) {
        const user = await this.usersRepository.findByIdSimple(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    /**
     * Validate that a user does not already own an office
     * Throws ConflictException if user already owns an office
     */
    async validateUserDoesNotOwnOffice(userId: string) {
        const existingOffice = await this.officesRepository.findByOwnerSimple(userId);

        if (existingOffice) {
            throw new ConflictException('User already owns an office');
        }
    }

    /**
     * Validate that an office exists by ID
     * Throws NotFoundException if office doesn't exist
     * Returns validation result (boolean) or throws
     */
    async validateOfficeExists(officeId: string) {
        const office = await this.officesRepository.findByIdSimple(officeId);

        if (!office) {
            throw new NotFoundException(`Office with ID ${officeId} not found`);
        }
        return office;
    }

    /**
     * Validate office deletion
     * Throws ConflictException if office has users or projects
     */
    validateDeleteCondition(office: any) {
        if (office._count.users > 0 || office._count.projects > 0) {
            throw new ConflictException(
                'Cannot permanently delete office with existing users or projects. Please remove them first.',
            );
        }
    }

    /**
     * Format office statistics response
     */
    formatStatistics(office: any) {
        return {
            officeId: office.id,
            officeName: office.name,
            status: office.status,
            statistics: {
                totalUsers: office._count.users,
                totalProjects: office._count.projects,
                totalOtpCodes: office._count.otpCodes,
            },
        };
    }
}
