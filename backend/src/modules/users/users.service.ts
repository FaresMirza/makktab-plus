import { ForbiddenException, Injectable, NotFoundException, Logger, Inject, forwardRef } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersHelper } from './helpers/users.helper';
import { UsersRepository } from './queries/users.queries';
import { OfficesRepository } from '../offices/queries/office.queries';
import { OtpService } from '../otps/otps.service';
import { UserStatus, OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';
import { JwtUser, TenantHelper } from '../../common/helpers/tenant.helper';
import { PaginationQueryDto, makePaginated, pagingArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersHelper: UsersHelper,
    private readonly usersRepository: UsersRepository,
    private readonly officesRepository: OfficesRepository,
    private readonly tenantHelper: TenantHelper,
    @Inject(forwardRef(() => OtpService))
    private readonly otpService: OtpService,
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

    const passwordToHash = password ?? randomBytes(32).toString('hex');
    const passwordHash = await this.usersHelper.hashPassword(passwordToHash);

    const userData: any = {
      ...rest,
      email,
      username,
      passwordHash,
      status: rest.status || UserStatus.PENDING,
      roles: rest.roles || [],
    };

    if (resolvedOfficePublicId) {
      const office = await this.officesRepository.findByPublicIdSimple(resolvedOfficePublicId);
      if (!office) {
        throw new NotFoundException(`Office with ID ${resolvedOfficePublicId} not found`);
      }
      userData.offices = { connect: { id: office.id } };
    }

    const created = await this.usersRepository.create(userData);

    let firstLoginOtpSent = false;
    try {
      await this.otpService.sendOtp({
        email: created.email,
        purpose: OtpPurpose.FIRST_LOGIN,
        channel: OtpChannel.EMAIL,
      });
      firstLoginOtpSent = true;
    } catch (err) {
      this.logger.warn(
        `Failed to send FIRST_LOGIN OTP to ${created.email}: ${(err as Error).message}`,
      );
    }

    return { ...this.usersHelper.formatUser(created), firstLoginOtpSent };
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
