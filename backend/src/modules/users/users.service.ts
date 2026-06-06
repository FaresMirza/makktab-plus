import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersHelper } from './helpers/users.helper';
import { UsersRepository } from './queries/users.queries';
import { OfficesRepository } from '../offices/queries/office.queries';
import { EmailService } from '../email/email.service';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtUser, TenantHelper } from '../../common/helpers/tenant.helper';
import { PaginationQueryDto, makePaginated, pagingArgs } from '../../common/dto/pagination.dto';

const ACTIVATION_TOKEN_BYTES = 32;
const ACTIVATION_TOKEN_TTL_HOURS = 7 * 24; // 7 days
const APP_URL = process.env.APP_URL || 'https://app.makktabplus.online';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersHelper: UsersHelper,
    private readonly usersRepository: UsersRepository,
    private readonly officesRepository: OfficesRepository,
    private readonly tenantHelper: TenantHelper,
    private readonly emailService: EmailService,
  ) { }

  /**
   * Verify a target user is in the caller's office (admins bypass).
   * Always allows the caller to act on themselves.
   */
  private async assertUserInScope(targetPublicId: string, user: JwtUser) {
    if (this.tenantHelper.isPlatformAdmin(user)) return;
    if (targetPublicId === user.userId) return;

    const callerOfficeId = await this.tenantHelper.resolveOfficeId(user);
    const target = await this.usersRepository.findByPublicId(targetPublicId);
    if (!target) throw new NotFoundException('User not found');
    const targetOfficeIds = [
      target.ownedOffice?.id,
      ...(target.offices ?? []).map((o: any) => o.id),
    ].filter(Boolean) as number[];
    if (!targetOfficeIds.includes(callerOfficeId!)) {
      throw new ForbiddenException('User is in a different office');
    }
  }

  private async assertCanChangeRoles(actorPublicId: string, targetPublicId: string, roles: string[], user: JwtUser) {
    if (roles.length === 0) {
      throw new BadRequestException('At least one role is required');
    }

    if (this.tenantHelper.isPlatformAdmin(user)) return;

    const actor = await this.usersRepository.findByPublicId(actorPublicId);
    const target = await this.usersRepository.findByPublicId(targetPublicId);
    if (!actor || !target) {
      throw new NotFoundException('User not found');
    }

    if (actor.publicId === target.publicId) {
      throw new ForbiddenException('Cannot change your own roles');
    }

    const actorOfficeId = actor.ownedOffice?.id;
    const targetOfficeIds = [
      target.ownedOffice?.id,
      ...(target.offices ?? []).map((office: any) => office.id),
    ].filter(Boolean) as number[];

    if (!actorOfficeId || !targetOfficeIds.includes(actorOfficeId)) {
      throw new ForbiddenException('Only the office owner can change employee roles');
    }

    if (target.roles.some((role: string) => ['owner', 'admin', 'super_admin'].includes(role))) {
      throw new ForbiddenException('Cannot change roles for this user');
    }

    const allowedRoles = ['employee', 'manager'];
    if (roles.length !== 1 || !allowedRoles.includes(roles[0])) {
      throw new BadRequestException('Office owners can only assign employee or manager roles');
    }
  }

  async create(createUserDto: CreateUserDto, user: JwtUser) {
    const { password, email, username, officeId, ...rest } = createUserDto;

    await this.usersHelper.validateUsernameUnique(username);
    await this.usersHelper.validateEmailUnique(email);

    // Tenant: non-admins can only create users in their own office.
    let resolvedOfficePublicId: string | undefined = officeId;
    if (!this.tenantHelper.isPlatformAdmin(user)) {
      const myOfficeId = await this.tenantHelper.resolveOfficeId(user);
      const office = await this.officesRepository.findByIdSimple(myOfficeId!);
      if (!office) throw new ForbiddenException('Office not found for caller');
      // Force the new user's office to the caller's office regardless of input.
      resolvedOfficePublicId = office.publicId;
    }

    // The user starts inactive with an unusable random password — they'll
    // set their real password through the activation link.
    const passwordToHash = password ?? randomBytes(32).toString('hex');
    const passwordHash = await this.usersHelper.hashPassword(passwordToHash);

    // Generate the one-time activation token (raw goes in the email,
    // hash goes in the DB).
    const rawToken = randomBytes(ACTIVATION_TOKEN_BYTES).toString('hex');
    const activationTokenHash = await bcrypt.hash(rawToken, 10);
    const activationTokenExpiresAt = new Date(
      Date.now() + ACTIVATION_TOKEN_TTL_HOURS * 60 * 60 * 1000,
    );

    const userData: any = {
      ...rest,
      email,
      username,
      passwordHash,
      // If the caller didn't pass a password, this is a link-activation user.
      status: rest.status || (password ? UserStatus.ACTIVE : UserStatus.PENDING),
      // Default newly-created office members to 'employee' so role-based
      // checks don't fall through to a no-role bucket.
      roles: rest.roles && rest.roles.length > 0 ? rest.roles : ['employee'],
      activationTokenHash: password ? null : activationTokenHash,
      activationTokenExpiresAt: password ? null : activationTokenExpiresAt,
    };

    if (resolvedOfficePublicId) {
      const office = await this.officesRepository.findByPublicIdSimple(resolvedOfficePublicId);
      if (!office) {
        throw new NotFoundException(`Office with ID ${resolvedOfficePublicId} not found`);
      }
      userData.offices = { connect: { id: office.id } };
    }

    const created = await this.usersRepository.create(userData);

    // Email the activation link (only when there's no password — meaning
    // this is the link-activation flow).
    let activationLinkSent = false;
    if (!password) {
      const link = `${APP_URL}/activate?u=${created.publicId}&t=${rawToken}`;
      try {
        await this.emailService.send({
          to: created.email,
          subject: 'تفعيل حسابك — Makktab Plus',
          text:
            `مرحباً ${created.fullName},\n\n` +
            `تم إنشاء حسابك على منصة Makktab Plus. لتفعيل الحساب وتعيين كلمة المرور، اتبع الرابط التالي:\n\n` +
            `${link}\n\n` +
            `الرابط صالح لمدة ${ACTIVATION_TOKEN_TTL_HOURS / 24} أيام. إن لم تكن تتوقع هذه الرسالة يمكنك تجاهلها.`,
          html:
            `<div style="font-family:'Segoe UI',Tahoma,sans-serif;direction:rtl;color:#111;line-height:1.7">` +
            `<p>مرحباً <strong>${created.fullName}</strong>,</p>` +
            `<p>تم إنشاء حسابك على منصة <strong>Makktab Plus</strong>. لتفعيل الحساب وتعيين كلمة المرور:</p>` +
            `<p style="margin:24px 0"><a href="${link}" style="background:#0a0a0a;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block;font-weight:600">تفعيل الحساب</a></p>` +
            `<p style="color:#666;font-size:13px">إذا لم يعمل الزر انسخ الرابط في المتصفح:<br/><span style="word-break:break-all">${link}</span></p>` +
            `<p style="color:#666;font-size:12px">الرابط صالح لمدة ${ACTIVATION_TOKEN_TTL_HOURS / 24} أيام.</p>` +
            `</div>`,
        });
        activationLinkSent = true;
      } catch (err) {
        this.logger.warn(
          `Failed to send activation email to ${created.email}: ${(err as Error).message}`,
        );
      }
    }

    return { ...this.usersHelper.formatUser(created), activationLinkSent };
  }

  /**
   * List users (paginated). Tenant-scoped by office (admins see all).
   */
  async findAll(user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.usersRepository.findFilteredPaginated(
      { officeId: officeId ?? undefined },
      skip,
      take,
    );
    const data = rows.map((u) => this.usersHelper.formatUser(u));
    return makePaginated(data, total, paging);
  }

  async findOne(publicId: string, user: JwtUser) {
    await this.assertUserInScope(publicId, user);
    const u = await this.usersRepository.findByPublicId(publicId);
    if (!u) throw new NotFoundException(`User with ID ${publicId} not found`);
    return this.usersHelper.formatUser(u);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) throw new NotFoundException(`User with username ${username} not found`);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException(`User with email ${email} not found`);
    return this.usersHelper.formatUser(user);
  }

  async update(publicId: string, updateUserDto: UpdateUserDto, user: JwtUser) {
    await this.assertUserInScope(publicId, user);
    const existingUser = await this.usersHelper.validateUserExists(publicId);

    const { password, email, username, ...rest } = updateUserDto;

    if (username && username !== existingUser.username) {
      await this.usersHelper.validateUsernameUnique(username, publicId);
    }
    if (email && email !== existingUser.email) {
      await this.usersHelper.validateEmailUnique(email, publicId);
    }

    const updateData: any = { ...rest };
    if (rest.roles !== undefined) {
      await this.assertCanChangeRoles(user.userId, publicId, rest.roles, user);
      updateData.roles = rest.roles;
    }
    if (email) updateData.email = email;
    if (username) updateData.username = username;
    if (password) {
      updateData.passwordHash = await this.usersHelper.hashPassword(password);
    }

    const updated = await this.usersRepository.update(existingUser.id, updateData);
    return this.usersHelper.formatUser(updated);
  }

  async remove(publicId: string, user: JwtUser, hardDelete = false) {
    await this.assertUserInScope(publicId, user);
    const target = await this.usersHelper.validateUserExists(publicId);

    if (hardDelete) {
      await this.usersRepository.delete(target.id);
      return { message: 'User permanently deleted' };
    }
    const deactivated = await this.usersRepository.softDelete(target.id);
    return this.usersHelper.formatUser(deactivated);
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return this.usersHelper.verifyPassword(password, user.passwordHash);
  }

  async changePassword(publicId: string, oldPassword: string, newPassword: string, user: JwtUser) {
    await this.assertUserInScope(publicId, user);
    const target = await this.usersHelper.validateUserExists(publicId);

    const ok = await this.usersHelper.verifyPassword(oldPassword, target.passwordHash);
    if (!ok) this.usersHelper.throwInvalidOldPassword();

    const newHash = await this.usersHelper.hashPassword(newPassword);
    await this.usersRepository.updatePassword(target.id, newHash);
    return { message: 'Password changed successfully' };
  }

  async findByOffice(officePublicId: string, user: JwtUser, paging?: PaginationQueryDto) {
    const office = await this.officesRepository.findByPublicIdSimple(officePublicId);
    if (!office) throw new NotFoundException(`Office with ID ${officePublicId} not found`);
    await this.tenantHelper.assertSameOffice(user, office.id);

    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.usersRepository.findFilteredPaginated(
      { officeId: office.id },
      skip,
      take,
    );
    const data = rows.map((u) => this.usersHelper.formatUser(u));
    return makePaginated(data, total, paging);
  }

  async findByRole(role: string, user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.usersRepository.findFilteredPaginated(
      { role, officeId: officeId ?? undefined },
      skip,
      take,
    );
    const data = rows.map((u) => this.usersHelper.formatUser(u));
    return makePaginated(data, total, paging);
  }

  async findByStatus(status: UserStatus, user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.usersRepository.findFilteredPaginated(
      { status, officeId: officeId ?? undefined },
      skip,
      take,
    );
    const data = rows.map((u) => this.usersHelper.formatUser(u));
    return makePaginated(data, total, paging);
  }
}
