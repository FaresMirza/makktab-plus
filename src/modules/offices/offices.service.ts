import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficesHelper } from './helpers/offices.helper';
import { OfficesRepository } from './queries/office.queries';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class OfficesService {
  constructor(
    private readonly officesHelper: OfficesHelper,
    private readonly officesRepository: OfficesRepository,
  ) { }

  /**
   * Create a new office
   * - Validates that owner user exists (by publicId)
   * - Validates that user doesn't already own an office
   * - Resolves publicId → internal id for DB creation
   */
  async create(createOfficeDto: CreateOfficeDto) {
    const { ownerUserId, ...rest } = createOfficeDto;

    // Validates user exists AND doesn't own an office, returns the user entity
    const user = await this.officesHelper.validateUserDoesNotOwnOffice(ownerUserId);

    // Create office using the internal user id
    const office = await this.officesRepository.create({
      ...rest,
      ownerUserId: user.id,
      status: rest.status || OfficeStatus.ACTIVE,
    });

    return office;
  }

  /**
   * Get all offices
   * - Includes owner information
   * - Includes user and project counts
   */
  async findAll() {
    return this.officesRepository.findAll();
  }

  /**
   * Get a specific office by publicId
   * - Includes list of users
   * - Includes list of projects
   */
  async findOne(publicId: string) {
    const office = await this.officesRepository.findByPublicId(publicId);

    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }

    return office;
  }

  /**
   * Get office by owner user publicId
   * - Returns the office owned by a specific user
   */
  async findByOwner(ownerUserPublicId: string) {
    const user = await this.officesHelper.validateUserExists(ownerUserPublicId);
    const office = await this.officesRepository.findByOwner(user.id);

    if (!office) {
      throw new NotFoundException(`No office found for user with ID ${ownerUserPublicId}`);
    }

    return office;
  }

  /**
   * Get offices by status
   * - Returns all offices with a specific status
   */
  async findByStatus(status: any) {
    return this.officesRepository.findByStatus(status);
  }

  /**
   * Update an office
   * - Accepts publicId
   * - Can update name and status
   * - Cannot update ownerUserId (use transfer ownership if needed)
   */
  async update(publicId: string, updateOfficeDto: UpdateOfficeDto) {
    // Check if office exists (by publicId), get internal entity
    const office = await this.officesHelper.validateOfficeExists(publicId);

    // Build update data (only non-FK fields)
    const { ownerUserId, ...updateData } = updateOfficeDto;

    const updatedOffice = await this.officesRepository.update(office.id, updateData);
    return updatedOffice;
  }

  /**
   * Delete/Suspend an office
   * - Soft delete: Sets status to SUSPENDED
   * - Hard delete: Permanently removes office (use with caution)
   */
  async remove(publicId: string, hardDelete = false) {
    // Check if office exists (by publicId)
    const officeSimple = await this.officesHelper.validateOfficeExists(publicId);

    const office = await this.officesRepository.findByIdWithCounts(officeSimple.id);
    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }

    if (hardDelete) {
      // Check if office has related records
      if (office._count.users > 0 || office._count.projects > 0) {
        throw new ConflictException(
          'Cannot permanently delete office with existing users or projects. Please remove them first.',
        );
      }

      await this.officesRepository.delete(office.id);
      return { message: 'Office permanently deleted' };
    } else {
      return this.officesRepository.softDelete(office.id);
    }
  }

  /**
   * Get office statistics
   * - Returns counts of users, projects, and other metrics
   */
  async getStatistics(publicId: string) {
    const officeSimple = await this.officesHelper.validateOfficeExists(publicId);
    const office = await this.officesRepository.findByIdWithStatistics(officeSimple.id);

    if (!office) {
      throw new NotFoundException(`Office with ID ${publicId} not found`);
    }

    return this.officesHelper.formatStatistics(office);
  }
}
