import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminsRepository } from './queries/admins.queries';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AdminsService {
    constructor(
        private readonly adminsRepository: AdminsRepository,
    ) { }

    /**
     * Get all offices
     */
    async getAllOffices() {
        return this.adminsRepository.findAllOffices();
    }

    /**
     * Get full office details by publicId
     */
    async getOffice(publicId: string) {
        const office = await this.adminsRepository.findOfficeByPublicId(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }
        return office;
    }

    /**
     * Deactivate (suspend) an office
     */
    async deactivateOffice(publicId: string) {
        const office = await this.adminsRepository.findOfficeByPublicIdSimple(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }
        return this.adminsRepository.updateOfficeStatus(office.id, OfficeStatus.SUSPENDED);
    }

    /**
     * Activate an office
     */
    async activateOffice(publicId: string) {
        const office = await this.adminsRepository.findOfficeByPublicIdSimple(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }
        return this.adminsRepository.updateOfficeStatus(office.id, OfficeStatus.ACTIVE);
    }
}
