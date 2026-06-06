import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtUser } from '../../common/helpers/tenant.helper';
import { PrismaService } from '../prisma/prisma.service';
import { AuditRepository } from './queries/audit.queries';

@Injectable()
export class AuditService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly auditRepository: AuditRepository,
    ) { }

    private async resolveOfficeId(user: JwtUser): Promise<number> {
        const actor = await this.prisma.user.findUnique({
            where: { publicId: user.userId },
            select: {
                ownedOffice: { select: { id: true } },
                offices: { select: { id: true } },
            },
        });

        if (!actor) {
            throw new NotFoundException('Authenticated user not found');
        }
        if (actor.ownedOffice) return actor.ownedOffice.id;
        if (actor.offices.length > 0) return actor.offices[0].id;

        throw new ForbiddenException('User is not attached to any office');
    }

    async getOfficeAuthLogs(user: JwtUser) {
        const officeId = await this.resolveOfficeId(user);
        return this.auditRepository.findOfficeAuthLogs(officeId);
    }
}
