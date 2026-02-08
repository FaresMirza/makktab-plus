import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginAttemptDto } from './dto/create-login-attempt.dto';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';
import { LoginAttemptsHelper } from './helpers/login-attempts.helper';
import { LoginAttemptsRepository } from './queries/login-attempts.queries';

@Injectable()
export class LoginAttemptsService {
  constructor(
    private readonly loginAttemptsHelper: LoginAttemptsHelper,
    private readonly loginAttemptsRepository: LoginAttemptsRepository,
  ) { }

  /**
   * Create a new login attempt record
   * - Records both successful and failed login attempts
   * - Stores security information (IP, device, location)
   * - Used for security monitoring and analytics
   */
  async create(createLoginAttemptDto: CreateLoginAttemptDto) {
    const { userId, officeId, success, method, ...rest } = createLoginAttemptDto;

    // Validate user exists
    await this.loginAttemptsHelper.validateUserExists(userId);

    // Validate office exists
    await this.loginAttemptsHelper.validateOfficeExists(officeId);

    const loginAttempt = await this.loginAttemptsRepository.create({
      userId,
      officeId,
      success,
      method,
      ip: rest.ip,
      userAgent: rest.userAgent,
      deviceFingerprint: rest.deviceFingerprint,
      geo: rest.geo,
      failReason: rest.failReason,
    });

    return loginAttempt;
  }

  /**
   * Get all login attempts
   * - Returns all login attempt records
   */
  async findAll() {
    return this.loginAttemptsRepository.findAll();
  }

  /**
   * Get a specific login attempt by ID
   * - Returns login attempt details
   */
  async findOne(id: string) {
    const loginAttempt = await this.loginAttemptsRepository.findById(id);

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
    return this.loginAttemptsRepository.findByUser(userId);
  }

  /**
   * Get login attempts by office
   * - Returns all login attempts for a specific office
   */
  async findByOffice(officeId: string) {
    return this.loginAttemptsRepository.findByOffice(officeId);
  }

  /**
   * Get failed login attempts
   * - Returns all unsuccessful login attempts
   * - Useful for security monitoring
   */
  async findFailed() {
    return this.loginAttemptsRepository.findFailed();
  }

  /**
   * Get successful login attempts
   * - Returns all successful login attempts
   */
  async findSuccessful() {
    return this.loginAttemptsRepository.findSuccessful();
  }

  /**
   * Get login attempts by method
   * - Returns all login attempts using a specific method (PASSWORD or OTP)
   */
  async findByMethod(method: LoginMethod) {
    return this.loginAttemptsRepository.findByMethod(method);
  }

  /**
   * Get login statistics for a user
   * - Returns counts of successful/failed attempts
   */
  async getUserStatistics(userId: string) {
    const total = await this.loginAttemptsRepository.countByUser(userId);
    const successful = await this.loginAttemptsRepository.countByUser(userId, true);
    const failed = await this.loginAttemptsRepository.countByUser(userId, false);

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
    await this.loginAttemptsHelper.validateLoginAttemptExists(id);

    await this.loginAttemptsRepository.delete(id);

    return { message: 'Login attempt deleted successfully' };
  }
}
