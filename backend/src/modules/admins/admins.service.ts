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
     * Permanently delete an office and every tenant record tied only to it.
     */
    async deleteOfficePermanently(publicId: string) {
        const office = await this.adminsRepository.findOfficeByPublicIdForPermanentDelete(publicId);
        if (!office) {
            throw new NotFoundException(`Office with ID ${publicId} not found`);
        }

        const relatedUsers = [office.owner, ...office.users].filter(
            (user, index, arr) => arr.findIndex((candidate) => candidate.id === user.id) === index,
        );

        const protectedAdmins = relatedUsers.filter((user) =>
            user.roles.some((role) => role === 'super_admin') ||
            user.email === 'admin@makktabplus.online',
        );
        if (protectedAdmins.length > 0) {
            throw new BadRequestException(
                'Cannot permanently delete an office linked to protected platform admin users.',
            );
        }

        const sharedUsers = relatedUsers.filter((user) => {
            const belongsToOtherOffice = user.offices.some((candidate) => candidate.id !== office.id);
            const ownsAnotherOffice = !!user.ownedOffice && user.ownedOffice.id !== office.id;
            return belongsToOtherOffice || ownsAnotherOffice;
        });
        if (sharedUsers.length > 0) {
            throw new BadRequestException(
                'Cannot permanently delete office because some related users belong to other offices.',
            );
        }

        await this.adminsRepository.permanentlyDeleteOfficeWithRelations(
            office.id,
            office.projects.map((project) => project.id),
            relatedUsers.map((user) => user.id),
        );

        return { message: `Office "${office.name}" permanently deleted` };
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

        // Approval requires the applicant to have verified their email
        // via OTP. Unverified rows aren't surfaced in admin listings, but
        // we also block direct-by-id approvals here in case someone
        // crafts the request manually.
        if (!request.emailVerified) {
            throw new BadRequestException(
                'Cannot approve: the applicant has not verified their email yet.',
            );
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
    /**
     * Get the last audit log for the admins
     */
    async getLastAdminLog() {
        return this.adminsHelper.getLastAdminLog();
    }

    /**
     * Get the audit logs for the admins
     */
    async getLast100AdminLogs() {
        return this.adminsHelper.getLast100AdminLogs();
    }
}
