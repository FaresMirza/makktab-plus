import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

    /**
     * Get all pending office requests
     */
    async getPendingRequests() {
        return this.adminsRepository.findPendingOfficeRequests();
    }

    /**
     * Handle office request: approve or reject
     * - approve: transaction → create User → create Office → set status = true
     * - reject: set status = false
     */
    async handleRequest(requestId: string, approve: boolean) {
        const request = await this.adminsRepository.findOfficeRequestById(requestId);
        if (!request) {
            throw new NotFoundException('Office request not found');
        }

        if (request.status !== null) {
            throw new BadRequestException(
                request.status ? 'Request already approved' : 'Request already rejected',
            );
        }

        if (!approve) {
            await this.adminsRepository.rejectOfficeRequest(requestId);
            return { message: 'Office request rejected' };
        }

        const office = await this.adminsRepository.approveOfficeRequest(request);

        return {
            message: 'Office request approved. User and office created.',
            office,
        };
    }
}
