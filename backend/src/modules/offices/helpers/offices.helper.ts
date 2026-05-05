import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../users/queries/users.queries';
import { OfficesRepository } from '../queries/office.queries';

@Injectable()
export class OfficesHelper {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly officesRepository: OfficesRepository,
    ) { }

    /**
     * Validate that a user exists by publicId
     * Throws NotFoundException if user doesn't exist
     * Returns the user entity (with internal id)
     */
    async validateUserExists(userPublicId: string) {
        const user = await this.usersRepository.findByPublicIdSimple(userPublicId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userPublicId} not found`);
        }

        return user;
    }

    /**
     * Validate that a user does not already own an office
     * Throws ConflictException if user already owns an office
     */
    async validateUserDoesNotOwnOffice(userPublicId: string) {
        const user = await this.validateUserExists(userPublicId);
        const existingOffice = await this.officesRepository.findByOwnerSimple(user.id);

        if (existingOffice) {
            throw new ConflictException('This user already owns an office');
        }

        return user;
    }

    /**
     * Validate that an office exists by publicId
     * Throws NotFoundException if office doesn't exist
     * Returns the office entity (with internal id)
     */
    async validateOfficeExists(officePublicId: string) {
        const office = await this.officesRepository.findByPublicIdSimple(officePublicId);

        if (!office) {
            throw new NotFoundException(`Office with ID ${officePublicId} not found`);
        }

        return office;
    }

    /**
     * Format statistics response
     */
    formatStatistics(office: any) {
        return {
            officeId: office.publicId,
            officeName: office.name,
            status: office.status,
            statistics: {
                totalUsers: office._count?.users ?? 0,
                totalProjects: office._count?.projects ?? 0,
                totalOtpCodes: office._count?.otpCodes ?? 0,
            },
        };
    }
}
