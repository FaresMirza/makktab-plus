import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminsRepository } from './queries/admins.queries';
import { AdminAction, OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { AdminsHelper, AuditMeta } from './helpers/admins.helper';

@Injectable()
export class AdminsService {
    constructor(
        private readonly adminsRepository: AdminsRepository,
        private readonly adminsHelper: AdminsHelper,
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
    async deactivateOffice(publicId: string, auditMeta: AuditMeta) {
        const office = await this.adminsRepository.findOfficeByPublicIdSimple(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }

        const result = await this.adminsRepository.updateOfficeStatus(office.id, OfficeStatus.SUSPENDED);

        await this.adminsHelper.logAction(auditMeta, AdminAction.OFFICE_DEACTIVATED, {
            targetOfficeId: office.id,
            reason: 'Manually deactivated by admin',
        });

        return result;
    }

    /**
     * Activate an office
     */
    async activateOffice(publicId: string, auditMeta: AuditMeta) {
        const office = await this.adminsRepository.findOfficeByPublicIdSimple(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }

        const result = await this.adminsRepository.updateOfficeStatus(office.id, OfficeStatus.ACTIVE);

        await this.adminsHelper.logAction(auditMeta, AdminAction.OFFICE_ACTIVATED, {
            targetOfficeId: office.id,
            reason: 'Manually activated by admin',
        });

        return result;
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
    async handleRequest(requestId: string, approve: boolean, auditMeta: AuditMeta) {
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

            await this.adminsHelper.logAction(auditMeta, AdminAction.OFFICE_REQUEST_REJECTED, {
                targetRequestId: requestId,
            });

            return { message: 'Office request rejected' };
        }

        const office = await this.adminsRepository.approveOfficeRequest(request);

        await this.adminsHelper.logAction(auditMeta, AdminAction.OFFICE_REQUEST_APPROVED, {
            targetRequestId: requestId,
            targetOfficeId: office.id,
        });

        return {
            message: 'Office request approved. User and office created.',
            office,
        };
    }
}
