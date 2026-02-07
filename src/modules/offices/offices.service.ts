import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class OfficesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new office
   * - Validates that the owner user exists
   * - Ensures user doesn't already own an office (ownerUserId is unique)
   * - Sets default status to ACTIVE if not provided
   */
  async create(createOfficeDto: CreateOfficeDto) {
    const { ownerUserId, name, status } = createOfficeDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: ownerUserId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${ownerUserId} not found`);
    }

    // Check if user already owns an office
    const existingOffice = await this.prisma.office.findUnique({
      where: { ownerUserId },
    });

    if (existingOffice) {
      throw new ConflictException('User already owns an office');
    }

    const office = await this.prisma.office.create({
      data: {
        name,
        ownerUserId,
        status: status || OfficeStatus.ACTIVE,
      },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
      },
    });

    return office;
  }

  /**
   * Get all offices
   * - Includes owner information
   * - Includes user and project counts
   */
  async findAll() {
    const offices = await this.prisma.office.findMany({
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return offices;
  }

  /**
   * Get a specific office by ID
   * - Includes owner information
   * - Includes list of users
   * - Includes list of projects
   */
  async findOne(id: string) {
    const office = await this.prisma.office.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
        users: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
            roles: true,
          },
        },
        projects: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

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
    const office = await this.prisma.office.findUnique({
      where: { ownerUserId },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
    });

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
    const offices = await this.prisma.office.findMany({
      where: { status },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return offices;
  }

  /**
   * Update an office
   * - Can update name and status
   * - Cannot update ownerUserId (use transfer ownership if needed)
   */
  async update(id: string, updateOfficeDto: UpdateOfficeDto) {
    // Check if office exists
    const existingOffice = await this.prisma.office.findUnique({
      where: { id },
    });

    if (!existingOffice) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    const updatedOffice = await this.prisma.office.update({
      where: { id },
      data: updateOfficeDto,
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            status: true,
          },
        },
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
    });

    return updatedOffice;
  }

  /**
   * Delete/Suspend an office
   * - Soft delete: Sets status to SUSPENDED
   * - Hard delete: Permanently removes office (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if office exists
    const office = await this.prisma.office.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
          },
        },
      },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    if (hardDelete) {
      // Check if office has related records
      if (office._count.users > 0 || office._count.projects > 0) {
        throw new ConflictException(
          'Cannot permanently delete office with existing users or projects. Please remove them first.',
        );
      }

      // Hard delete - permanently remove office
      await this.prisma.office.delete({
        where: { id },
      });
      return { message: 'Office permanently deleted' };
    } else {
      // Soft delete - suspend office
      const suspendedOffice = await this.prisma.office.update({
        where: { id },
        data: { status: OfficeStatus.SUSPENDED },
        include: {
          owner: {
            select: {
              id: true,
              fullName: true,
              email: true,
              username: true,
            },
          },
        },
      });
      return suspendedOffice;
    }
  }

  /**
   * Get office statistics
   * - Returns counts of users, projects, and other metrics
   */
  async getStatistics(id: string) {
    const office = await this.prisma.office.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            otpCodes: true,
            loginAttempts: true,
          },
        },
      },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }

    return {
      officeId: office.id,
      officeName: office.name,
      status: office.status,
      statistics: {
        totalUsers: office._count.users,
        totalProjects: office._count.projects,
        totalOtpCodes: office._count.otpCodes,
        totalLoginAttempts: office._count.loginAttempts,
      },
    };
  }
}
