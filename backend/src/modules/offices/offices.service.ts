import { ForbiddenException, Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficesHelper } from './helpers/offices.helper';
import { OfficesRepository } from './queries/office.queries';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtUser, TenantHelper } from '../../common/helpers/tenant.helper';
import { PaginationQueryDto, makePaginated, pagingArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class OfficesService {
  constructor(
    private readonly officesHelper: OfficesHelper,
    private readonly officesRepository: OfficesRepository,
    private readonly tenantHelper: TenantHelper,
  ) { }

  async create(createOfficeDto: CreateOfficeDto) {
    const { ownerUserId, ...rest } = createOfficeDto;
    const user = await this.officesHelper.validateUserDoesNotOwnOffice(ownerUserId);
    return this.officesRepository.create({
      ...rest,
      ownerUserId: user.id,
      status: rest.status || OfficeStatus.ACTIVE,
    });
  }

  /**
   * Paginated list, tenant-scoped (non-admin sees only their own office).
   */
  async findAll(user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.officesRepository.findFilteredPaginated(
      { officeId: officeId ?? undefined },
      skip,
      take,
    );
    return makePaginated(rows, total, paging);
  }

  async findOne(publicId: string, user: JwtUser) {
    const office = await this.officesRepository.findByPublicId(publicId);
    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }
    await this.tenantHelper.assertSameOffice(user, office.id);
    return office;
  }

  async findByOwner(ownerUserPublicId: string, user: JwtUser) {
    const owner = await this.officesHelper.validateUserExists(ownerUserPublicId);
    const office = await this.officesRepository.findByOwner(owner.id);
    if (!office) {
      throw new NotFoundException(`No office found for user with ID ${ownerUserPublicId}`);
    }
    await this.tenantHelper.assertSameOffice(user, office.id);
    return office;
  }

  async findByStatus(status: OfficeStatus, user: JwtUser, paging?: PaginationQueryDto) {
    const officeId = await this.tenantHelper.tryResolveOfficeId(user);
    const { skip, take } = pagingArgs(paging);
    const [rows, total] = await this.officesRepository.findFilteredPaginated(
      { status, officeId: officeId ?? undefined },
      skip,
      take,
    );
    return makePaginated(rows, total, paging);
  }

  async update(publicId: string, updateOfficeDto: UpdateOfficeDto) {
    const office = await this.officesHelper.validateOfficeExists(publicId);
    const { ownerUserId, ...updateData } = updateOfficeDto;
    try {
      return await this.officesRepository.update(office.id, updateData);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Username or Email is already taken.');
      }
      throw error;
    }
  }

  async remove(publicId: string, hardDelete = false) {
    const officeSimple = await this.officesHelper.validateOfficeExists(publicId);
    const office = await this.officesRepository.findByIdWithCounts(officeSimple.id);
    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }
    if (hardDelete) {
      if (office._count.users > 0 || office._count.projects > 0) {
        throw new ConflictException(
          'Cannot permanently delete office with existing users or projects. Please remove them first.',
        );
      }
      await this.officesRepository.delete(office.id);
      return { message: 'Office permanently deleted' };
    }
    return this.officesRepository.softDelete(office.id);
  }

  async getStatistics(publicId: string, user: JwtUser) {
    const officeSimple = await this.officesHelper.validateOfficeExists(publicId);
    await this.tenantHelper.assertSameOffice(user, officeSimple.id);
    const office = await this.officesRepository.findByIdWithStatistics(officeSimple.id);
    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }
    return this.officesHelper.formatStatistics(office);
  }
}
