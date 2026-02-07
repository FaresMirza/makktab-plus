import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOtpCodeDto } from './dto/create-otp-code.dto';
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto';
import { OtpPurpose, OtpChannel } from 'prisma/src/generated/prisma-client/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OtpCodesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generate a new OTP code
   * - Creates a hashed OTP code
   * - Sets expiration time (default 10 minutes)
   * - Stores device and request information for security
   */
  async create(createOtpCodeDto: CreateOtpCodeDto) {
    const { userId, officeId, purpose, channel, code, ...rest } = createOtpCodeDto;

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

    // Hash the OTP code
    const saltRounds = 10;
    const codeHash = await bcrypt.hash(code, saltRounds);

    // Set expiration time (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const otpCode = await this.prisma.otpCode.create({
      data: {
        userId,
        officeId,
        purpose,
        channel,
        codeHash,
        attempts: rest.attempts ?? 0,
        deviceFingerprint: rest.deviceFingerprint,
        ip: rest.ip,
        userAgent: rest.userAgent,
        emailSnapshot: rest.emailSnapshot || user.email,
        phoneSnapshot: rest.phoneSnapshot || user.phone,
        expiresAt,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
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

    // Don't return the hashed code
    const { codeHash: _, ...otpWithoutHash } = otpCode;
    return otpWithoutHash;
  }

  /**
   * Verify an OTP code
   * - Checks if OTP exists and is not expired
   * - Verifies the code matches
   * - Marks as used if valid
   * - Increments attempt counter
   */
  async verify(verifyOtpCodeDto: VerifyOtpCodeDto) {
    const { code, userId, officeId } = verifyOtpCodeDto;

    // Find the most recent unused OTP for this user
    const otpCode = await this.prisma.otpCode.findFirst({
      where: {
        userId,
        officeId,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpCode) {
      throw new BadRequestException('No valid OTP found or OTP has expired');
    }

    // Increment attempt counter
    await this.prisma.otpCode.update({
      where: { id: otpCode.id },
      data: {
        attempts: otpCode.attempts + 1,
      },
    });

    // Check if too many attempts
    if (otpCode.attempts >= 3) {
      throw new BadRequestException('Too many verification attempts. Please request a new OTP.');
    }

    // Verify the code
    const isValid = await bcrypt.compare(code, otpCode.codeHash);

    if (!isValid) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark as used
    await this.prisma.otpCode.update({
      where: { id: otpCode.id },
      data: {
        usedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'OTP verified successfully',
    };
  }

  /**
   * Get all OTP codes
   * - Returns all OTP records (for admin purposes)
   * - Excludes the actual code hash
   */
  async findAll() {
    const otpCodes = await this.prisma.otpCode.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
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

    return otpCodes;
  }

  /**
   * Get a specific OTP code by ID
   * - Returns OTP details
   */
  async findOne(id: string) {
    const otpCode = await this.prisma.otpCode.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
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

    if (!otpCode) {
      throw new NotFoundException(`OTP code with ID ${id} not found`);
    }

    return otpCode;
  }

  /**
   * Get OTP codes by user
   * - Returns all OTP codes for a specific user
   */
  async findByUser(userId: string) {
    const otpCodes = await this.prisma.otpCode.findMany({
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

    return otpCodes;
  }

  /**
   * Get OTP codes by purpose
   * - Returns all OTP codes for a specific purpose
   */
  async findByPurpose(purpose: OtpPurpose) {
    const otpCodes = await this.prisma.otpCode.findMany({
      where: { purpose },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
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

    return otpCodes;
  }

  /**
   * Get expired OTP codes
   * - Returns all OTP codes that have expired
   */
  async findExpired() {
    const otpCodes = await this.prisma.otpCode.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        usedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
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

    return otpCodes;
  }

  /**
   * Delete an OTP code
   * - Permanently removes the OTP code
   */
  async remove(id: string) {
    // Check if OTP exists
    const otpCode = await this.prisma.otpCode.findUnique({
      where: { id },
    });

    if (!otpCode) {
      throw new NotFoundException(`OTP code with ID ${id} not found`);
    }

    await this.prisma.otpCode.delete({
      where: { id },
    });

    return { message: 'OTP code deleted successfully' };
  }
}
