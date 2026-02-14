import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../users/queries/users.queries';
import { OfficesRepository } from '../offices/queries/office.queries';
import { AuditRepository } from '../audit/queries/audit.queries';
import { UserStatus, OfficeStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class AdminsService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly officesRepository: OfficesRepository,
        private readonly auditRepository: AuditRepository,
    ) { }

    // ─── USER MANAGEMENT ────────────────────────────────────────

    async findAllUsers(status?: string, officePublicId?: string) {
        if (officePublicId) {
            const office = await this.officesRepository.findByPublicIdSimple(officePublicId);
            if (!office) throw new NotFoundException(`Office with ID ${officePublicId} not found`);
            return this.usersRepository.findByOffice(office.id);
        }
        if (status) {
            return this.usersRepository.findByStatus(status as UserStatus);
        }
        return this.usersRepository.findAll();
    }

    async findUser(publicId: string) {
        const user = await this.usersRepository.findByPublicId(publicId);
        if (!user) throw new NotFoundException(`User with ID ${publicId} not found`);

        const { passwordHash, refreshTokenHash, ...safeUser } = user as any;
        return safeUser;
    }

    async updateUserRoles(publicId: string, roles: string[]) {
        if (!Array.isArray(roles)) {
            throw new BadRequestException('roles must be an array of strings');
        }

        const user = await this.usersRepository.findByPublicIdSimple(publicId);
        if (!user) throw new NotFoundException(`User with ID ${publicId} not found`);

        return this.usersRepository.update(user.id, { roles });
    }

    async updateUserStatus(publicId: string, status: string) {
        const validStatuses = Object.values(UserStatus);
        if (!validStatuses.includes(status as UserStatus)) {
            throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const user = await this.usersRepository.findByPublicIdSimple(publicId);
        if (!user) throw new NotFoundException(`User with ID ${publicId} not found`);

        return this.usersRepository.update(user.id, { status: status as UserStatus });
    }

    async removeUser(publicId: string) {
        const user = await this.usersRepository.findByPublicIdSimple(publicId);
        if (!user) throw new NotFoundException(`User with ID ${publicId} not found`);

        await this.usersRepository.delete(user.id);
        return { message: 'User permanently deleted' };
    }

    // ─── OFFICE MANAGEMENT ──────────────────────────────────────

    async findAllOffices(status?: string) {
        if (status) {
            return this.officesRepository.findByStatus(status as OfficeStatus);
        }
        return this.officesRepository.findAll();
    }

    async updateOfficeStatus(publicId: string, status: string) {
        const validStatuses = Object.values(OfficeStatus);
        if (!validStatuses.includes(status as OfficeStatus)) {
            throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        const office = await this.officesRepository.findByPublicIdSimple(publicId);
        if (!office) throw new NotFoundException(`Office with ID ${publicId} not found`);

        return this.officesRepository.update(office.id, { status: status as OfficeStatus });
    }

    // ─── AUDIT LOGS ─────────────────────────────────────────────

    async getAuthAuditLogs() {
        return this.auditRepository.findAllAuthLogs();
    }

    async getAuthAuditLogsByUser(userPublicId: string) {
        const user = await this.usersRepository.findByPublicIdSimple(userPublicId);
        if (!user) throw new NotFoundException(`User with ID ${userPublicId} not found`);
        return this.auditRepository.findAuthLogsByUser(user.id);
    }
}
