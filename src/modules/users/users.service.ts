import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersHelper } from './helpers/users.helper';
import { UsersRepository } from './queries/users.queries';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersHelper: UsersHelper,
    private readonly usersRepository: UsersRepository,
  ) { }

  /**
   * Create a new user
   * - Validates username and email uniqueness
   * - Hashes the password before storing
   * - Sets default status to PENDING if not provided
   * - Connects user to office if officeId is provided
   */
  async create(createUserDto: CreateUserDto) {
    const { password, email, username, officeId, ...rest } = createUserDto;

    // Check if username already exists
    await this.usersHelper.validateUsernameUnique(username);
    await this.usersHelper.validateEmailUnique(email);

    // Hash the password
    const passwordHash = await this.usersHelper.hashPassword(password);

    // Create the user with optional office connection
    const userData: any = {
      ...rest,
      email,
      username,
      passwordHash,
      status: rest.status || UserStatus.PENDING,
      roles: rest.roles || [],
    };

    // Add office connection if officeId is provided
    if (officeId) {
      userData.offices = {
        connect: { id: officeId },
      };
    }

    const user = await this.usersRepository.create(userData);

    return this.usersHelper.formatUser(user);
  }

  /**
   * Get all users
   * - Excludes passwordHash from response
   * - Includes related offices
   */
  async findAll() {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.usersHelper.formatUser(user));
  }

  /**
   * Get a specific user by ID
   * - Excludes passwordHash from response
   * - Includes related data
   */
  async findOne(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersHelper.formatUser(user);
  }

  /**
   * Find user by username
   * - Used primarily for authentication
   * - Includes passwordHash for verification
   */
  async findByUsername(username: string) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  /**
   * Find user by email
   * - Excludes passwordHash from response
   */
  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return this.usersHelper.formatUser(user);
  }

  /**
   * Update a user
   * - Validates username and email uniqueness if changed
   * - Hashes password if provided in update
   * - Excludes passwordHash from response
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    // Check if user exists
    const existingUser = await this.usersHelper.validateUserExists(id);

    const { password, email, username, ...rest } = updateUserDto;

    // Check username uniqueness if being updated
    if (username && username !== existingUser.username) {
      await this.usersHelper.validateUsernameUnique(username, id);
    }

    // Check email uniqueness if being updated
    if (email && email !== existingUser.email) {
      await this.usersHelper.validateEmailUnique(email, id);
    }

    // Prepare update data
    const updateData: any = { ...rest };

    if (email) updateData.email = email;
    if (username) updateData.username = username;

    // Hash password if provided
    if (password) {
      updateData.passwordHash = await this.usersHelper.hashPassword(password);
    }

    const updatedUser = await this.usersRepository.update(id, updateData);
    return this.usersHelper.formatUser(updatedUser);
  }

  /**
   * Delete/Deactivate a user
   * - Soft delete: Sets status to DEACTIVATED
   * - Hard delete: Permanently removes user (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if user exists
    // Check if user exists
    await this.usersHelper.validateUserExists(id);

    if (hardDelete) {
      // Hard delete - permanently remove user
      await this.usersRepository.delete(id);
      return { message: 'User permanently deleted' };
    } else {
      // Soft delete - deactivate user
      const deactivatedUser = await this.usersRepository.softDelete(id);
      return this.usersHelper.formatUser(deactivatedUser);
    }
  }

  /**
   * Verify user password
   * - Used for authentication
   */
  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return this.usersHelper.verifyPassword(password, user.passwordHash);
  }

  /**
   * Change user password
   * - Requires old password verification
   */
  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.usersHelper.validateUserExists(id);

    // Verify old password
    const isValidPassword = await this.usersHelper.verifyPassword(oldPassword, user.passwordHash);
    if (!isValidPassword) {
      this.usersHelper.throwInvalidOldPassword();
    }

    // Hash new password
    const newPasswordHash = await this.usersHelper.hashPassword(newPassword);

    await this.usersRepository.updatePassword(id, newPasswordHash);

    return { message: 'Password changed successfully' };
  }

  /**
   * Get users by office
   * - Returns all users belonging to a specific office
   */
  async findByOffice(officeId: string) {
    const users = await this.usersRepository.findByOffice(officeId);
    return users.map((user) => this.usersHelper.formatUser(user));
  }

  /**
   * Get users by role
   * - Returns all users with a specific role
   */
  async findByRole(role: string) {
    const users = await this.usersRepository.findByRole(role);
    return users.map((user) => this.usersHelper.formatUser(user));
  }

  /**
   * Get users by status
   * - Returns all users with a specific status
   */
  async findByStatus(status: UserStatus) {
    const users = await this.usersRepository.findByStatus(status);
    return users.map((user) => this.usersHelper.formatUser(user));
  }
}
