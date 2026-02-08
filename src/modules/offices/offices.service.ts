import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { OfficesHelper } from './helpers/offices.helper';
import { OfficesRepository } from './queries/office.queries'; // Use the repository service


@Injectable()
export class OfficesService {
  constructor(
    private readonly officesRepository: OfficesRepository,
    private readonly officesHelper: OfficesHelper,
  ) { }

  /**
   * Create a new office
   * - Validates that the owner user exists
   * - Ensures user doesn't already own an office (ownerUserId is unique)
   * - Sets default status to ACTIVE if not provided
   */
  async create(createOfficeDto: CreateOfficeDto) {
    const { ownerUserId, name, status } = createOfficeDto;

    await this.officesHelper.validateUserExists(ownerUserId);
    await this.officesHelper.validateUserDoesNotOwnOffice(ownerUserId);

    const office = await this.officesRepository.create({
      name,
      ownerUserId,
      status: status || OfficeStatus.ACTIVE,
    });

    return office;
  }

  /**
   * Get all offices
   * - Includes owner information
   * - Includes user and project counts
   */
  async findAll() {
    const offices = await this.officesRepository.findAll();

    return offices;
  }

  /**
   * Get a specific office by ID
   * - Includes owner information
   * - Includes list of users
   * - Includes list of projects
   */
  async findOne(id: string) {
    const office = await this.officesRepository.findById(id);

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    return office;
  }

  /**
   * Get office by owner user ID
   * - Returns the office owned by a specific user
   */
  async findByOwner(ownerUserId: string) {
    const office = await this.officesRepository.findByOwner(ownerUserId);

    if (!office) {
      throw new NotFoundException(`No office found for user with ID ${ownerUserId}`);
    }

    return office;
  }

  /**
   * Get offices by status
   * - Returns all offices with a specific status
   */
  async findByStatus(status: OfficeStatus) {
    const offices = await this.officesRepository.findByStatus(status);

    return offices;
  }

  /**
   * Update an office
   * - Can update name and status
   * - Cannot update ownerUserId (use transfer ownership if needed)
   */
  async update(id: string, updateOfficeDto: UpdateOfficeDto) {
    // Check if office exists
    await this.officesHelper.validateOfficeExists(id);

    const updatedOffice = await this.officesRepository.update(id, updateOfficeDto);

    return updatedOffice;
  }

  /**
   * Delete/Suspend an office
   * - Soft delete: Sets status to SUSPENDED
   * - Hard delete: Permanently removes office (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if office exists
    // Check if office exists
    const office = await this.officesRepository.findByIdWithCounts(id);

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    if (hardDelete) {
      // Check if office has related records
      this.officesHelper.validateDeleteCondition(office);

      // Hard delete - permanently remove office
      await this.officesRepository.delete(id);
      return { message: 'Office permanently deleted' };
    } else {
      // Soft delete - suspend office
      return this.officesRepository.softDelete(id);
    }
  }

  /**
   * Get office statistics
   * - Returns counts of users, projects, and other metrics
   */
  async getStatistics(id: string) {
    const office = await this.officesRepository.findByIdWithStatistics(id);

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    return this.officesHelper.formatStatistics(office);
  }
}
