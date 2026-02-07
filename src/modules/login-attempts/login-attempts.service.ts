import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoginAttemptDto } from './dto/create-login-attempt.dto';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class LoginAttemptsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new login attempt record
   * - Records both successful and failed login attempts
   * - Stores security information (IP, device, location)
   * - Used for security monitoring and analytics
   */
  async create(createLoginAttemptDto: CreateLoginAttemptDto) {
    const { userId, officeId, success, method, ...rest } = createLoginAttemptDto;

    // Validate user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Validate office exists
    const office = await this.prisma.office.findUnique({
      where: { id: officeId },
    });

    if (!office) {
      throw new NotFoundException(`Office with ID ${officeId} not found`);
    }

    const loginAttempt = await this.prisma.loginAttempt.create({
      data: {
        userId,
        officeId,
        success,
        method,
        ip: rest.ip,
        userAgent: rest.userAgent,
        deviceFingerprint: rest.deviceFingerprint,
        geo: rest.geo,
        failReason: rest.failReason,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return loginAttempt;
  }

  /**
   * Get all login attempts
   * - Returns all login attempt records
   */
  async findAll() {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get a specific login attempt by ID
   * - Returns login attempt details
   */
  async findOne(id: string) {
    const loginAttempt = await this.prisma.loginAttempt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!loginAttempt) {
      throw new NotFoundException(`Login attempt with ID ${id} not found`);
    }

    return loginAttempt;
  }

  /**
   * Get login attempts by user
   * - Returns all login attempts for a specific user
   */
  async findByUser(userId: string) {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      where: { userId },
      include: {
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get login attempts by office
   * - Returns all login attempts for a specific office
   */
  async findByOffice(officeId: string) {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      where: { officeId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get failed login attempts
   * - Returns all unsuccessful login attempts
   * - Useful for security monitoring
   */
  async findFailed() {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      where: { success: false },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get successful login attempts
   * - Returns all successful login attempts
   */
  async findSuccessful() {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      where: { success: true },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get login attempts by method
   * - Returns all login attempts using a specific method (PASSWORD or OTP)
   */
  async findByMethod(method: LoginMethod) {
    const loginAttempts = await this.prisma.loginAttempt.findMany({
      where: { method },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
          },
        },
        office: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return loginAttempts;
  }

  /**
   * Get login statistics for a user
   * - Returns counts of successful/failed attempts
   */
  async getUserStatistics(userId: string) {
    const total = await this.prisma.loginAttempt.count({
      where: { userId },
    });

    const successful = await this.prisma.loginAttempt.count({
      where: { userId, success: true },
    });

    const failed = await this.prisma.loginAttempt.count({
      where: { userId, success: false },
    });

    return {
      userId,
      statistics: {
        total,
        successful,
        failed,
        successRate: total > 0 ? ((successful / total) * 100).toFixed(2) + '%' : '0%',
      },
    };
  }

  /**
   * Delete a login attempt
   * - Permanently removes the login attempt record
   */
  async remove(id: string) {
    // Check if login attempt exists
    const loginAttempt = await this.prisma.loginAttempt.findUnique({
      where: { id },
    });

    if (!loginAttempt) {
      throw new NotFoundException(`Login attempt with ID ${id} not found`);
    }

    await this.prisma.loginAttempt.delete({
      where: { id },
    });

    return { message: 'Login attempt deleted successfully' };
  }
}
