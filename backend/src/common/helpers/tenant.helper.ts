import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';

export interface JwtUser {
  userId: string; // publicId from JWT `sub`
  username: string;
  roles: string[];
}

const PLATFORM_ADMIN_ROLES = ['admin', 'super_admin'];

/**
 * TenantHelper — single source of truth for resolving the office/tenant
 * scope of a request. Injected by feature services that need to scope
 * reads/writes to the requester's office.
 */
@Injectable()
export class TenantHelper {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * True if the request comes from a platform-level admin
   * (admin / super_admin). Platform admins bypass tenant scoping.
   */
  isPlatformAdmin(user: JwtUser | undefined | null): boolean {
    if (!user?.roles) return false;
    return user.roles.some((r) => PLATFORM_ADMIN_ROLES.includes(r));
  }

  /**
   * Resolve the requester's office internal id.
   *  - Returns `null` for platform admins (means: don't filter).
   *  - Returns owned office's id, otherwise the first office membership.
   *  - Throws ForbiddenException if a non-admin user has no office at all.
   */
  async resolveOfficeId(user: JwtUser): Promise<number | null> {
    if (!user?.userId) {
      throw new UnauthorizedException('Missing authenticated user');
    }
    if (this.isPlatformAdmin(user)) return null;

    const record = await this.prisma.user.findUnique({
      where: { publicId: user.userId },
      select: {
        ownedOffice: { select: { id: true } },
        offices: { select: { id: true } },
      },
    });

    if (!record) {
      throw new UnauthorizedException('Authenticated user not found');
    }
    if (record.ownedOffice) return record.ownedOffice.id;
    if (record.offices && record.offices.length > 0) return record.offices[0].id;

    throw new ForbiddenException('User is not attached to any office');
  }

  /**
   * Like resolveOfficeId, but returns null for any caller (admin or not)
   * without an office attachment, instead of throwing. Useful for read
   * paths where "no scope ⇒ no results" is the intended behaviour.
   */
  async tryResolveOfficeId(user: JwtUser): Promise<number | null> {
    try {
      return await this.resolveOfficeId(user);
    } catch {
      return null;
    }
  }

  /**
   * Verify that an office (by internal id) is the same as the caller's
   * scope. Platform admins always pass.
   */
  async assertSameOffice(user: JwtUser, officeId: number): Promise<void> {
    if (this.isPlatformAdmin(user)) return;
    const myOfficeId = await this.resolveOfficeId(user);
    if (myOfficeId !== officeId) {
      throw new ForbiddenException('Resource is in a different office');
    }
  }

  /**
   * Authorize project-management actions (creating tasks, attaching files,
   * deleting tasks, etc.). The caller passes if any of the following:
   *  - platform admin / super_admin
   *  - office owner (their User.ownedOffice matches the project's office)
   *  - has 'manager' role AND is in the same office
   *  - is the project's projectManagerUser (the assigned manager)
   * Otherwise → ForbiddenException.
   */
  async assertCanManageProject(
    user: JwtUser,
    project: { officeId: number; projectManagerUserId: number },
  ): Promise<void> {
    if (this.isPlatformAdmin(user)) return;

    const userRecord = await this.prisma.user.findUnique({
      where: { publicId: user.userId },
      select: {
        id: true,
        ownedOffice: { select: { id: true } },
        offices: { select: { id: true } },
      },
    });
    if (!userRecord) {
      throw new ForbiddenException('Authenticated user not found');
    }

    // Project's assigned manager?
    if (project.projectManagerUserId === userRecord.id) return;

    // Office owner of THIS office?
    if (userRecord.ownedOffice?.id === project.officeId) return;

    // Office manager (role 'manager') in the same office?
    const inSameOffice =
      userRecord.ownedOffice?.id === project.officeId ||
      userRecord.offices.some((o) => o.id === project.officeId);
    if (inSameOffice && user.roles?.includes('manager')) return;

    throw new ForbiddenException('You cannot manage this project');
  }
}
