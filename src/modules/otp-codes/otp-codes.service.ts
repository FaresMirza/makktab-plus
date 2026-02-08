import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOtpCodeDto } from './dto/create-otp-code.dto';
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';
import { OtpCodesHelper } from './helpers/otp-codes.helper';
import { OtpCodesRepository } from './queries/otp-codes.queries';

@Injectable()
export class OtpCodesService {
  constructor(
    private readonly otpCodesHelper: OtpCodesHelper,
    private readonly otpCodesRepository: OtpCodesRepository,
  ) { }

  /**
   * Generate a new OTP code
   * - Creates a hashed OTP code
   * - Sets expiration time (default 10 minutes)
   * - Stores device and request information for security
   */
  async create(createOtpCodeDto: CreateOtpCodeDto) {
    const { userId, officeId, purpose, channel, code, ...rest } = createOtpCodeDto;

    // Validate user exists
    const user = await this.otpCodesHelper.validateUserExists(userId);

    // Validate office exists
    await this.otpCodesHelper.validateOfficeExists(officeId);

    // Hash the OTP code
    const codeHash = await this.otpCodesHelper.hashCode(code);

    // Set expiration time (10 minutes from now)
    const expiresAt = this.otpCodesHelper.calculateExpiration();

    const otpCode = await this.otpCodesRepository.create({
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
    const otpCode = await this.otpCodesRepository.findValidOtp(userId, officeId);

    if (!otpCode) {
      throw new BadRequestException('No valid OTP found or OTP has expired');
    }

    // Increment attempt counter
    const updatedOtp = await this.otpCodesRepository.updateAttempts(otpCode.id, otpCode.attempts + 1);

    // Check if too many attempts
    if (updatedOtp.attempts >= 3) {
      throw new BadRequestException('Too many verification attempts. Please request a new OTP.');
    }

    // Verify the code
    const isValid = await this.otpCodesHelper.verifyCode(code, otpCode.codeHash);

    if (!isValid) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Mark as used
    await this.otpCodesRepository.markAsUsed(otpCode.id);

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
    return this.otpCodesRepository.findAll();
  }

  /**
   * Get a specific OTP code by ID
   * - Returns OTP details
   */
  async findOne(id: string) {
    const otpCode = await this.otpCodesRepository.findById(id);

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
    return this.otpCodesRepository.findByUser(userId);
  }

  /**
   * Get OTP codes by purpose
   * - Returns all OTP codes for a specific purpose
   */
  async findByPurpose(purpose: OtpPurpose) {
    return this.otpCodesRepository.findByPurpose(purpose);
  }

  /**
   * Get expired OTP codes
   * - Returns all OTP codes that have expired
   */
  async findExpired() {
    return this.otpCodesRepository.findExpired();
  }

  /**
   * Delete an OTP code
   * - Permanently removes the OTP code
   */
  async remove(id: string) {
    // Check if OTP exists
    await this.otpCodesHelper.validateOtpCodeExists(id);

    await this.otpCodesRepository.delete(id);

    return { message: 'OTP code deleted successfully' };
  }
}
