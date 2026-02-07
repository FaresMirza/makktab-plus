import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

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

    const user = await this.prisma.user.create({
      data: userData,
      include: {
        offices: true,
      },
    });

    // Remove passwordHash from response
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Get all users
   * - Excludes passwordHash from response
   * - Includes related offices
   */
  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        offices: true,
        ownedOffice: true,
      },
    });

    // Remove passwordHash from all users
    return users.map(({ passwordHash, ...user }) => user);
  }

  /**
   * Get a specific user by ID
   * - Excludes passwordHash from response
   * - Includes related data
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        offices: true,
        ownedOffice: true,
        createdProjects: true,
        managedProjects: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Find user by username
   * - Used primarily for authentication
   * - Includes passwordHash for verification
   */
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        offices: true,
        ownedOffice: true,
      },
    });

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
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        offices: true,
        ownedOffice: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update a user
   * - Validates username and email uniqueness if changed
   * - Hashes password if provided in update
   * - Excludes passwordHash from response
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, email, username, ...rest } = updateUserDto;

    // Check username uniqueness if being updated
    if (username && username !== existingUser.username) {
      const usernameExists = await this.prisma.user.findUnique({
        where: { username },
      });
      if (usernameExists) {
        throw new ConflictException('Username already exists');
      }
    }

    // Check email uniqueness if being updated
    if (email && email !== existingUser.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    // Prepare update data
    const updateData: any = { ...rest };

    if (email) updateData.email = email;
    if (username) updateData.username = username;

    // Hash password if provided
    if (password) {
      const saltRounds = 10;
      updateData.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        offices: true,
        ownedOffice: true,
      },
    });

    const { passwordHash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Delete/Deactivate a user
   * - Soft delete: Sets status to DEACTIVATED
   * - Hard delete: Permanently removes user (use with caution)
   */
  async remove(id: string, hardDelete = false) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (hardDelete) {
      // Hard delete - permanently remove user
      // Note: This might fail if user has related records
      await this.prisma.user.delete({
        where: { id },
      });
      return { message: 'User permanently deleted' };
    } else {
      // Soft delete - deactivate user
      const deactivatedUser = await this.prisma.user.update({
        where: { id },
        data: { status: UserStatus.DEACTIVATED },
      });
      const { passwordHash, ...userWithoutPassword } = deactivatedUser;
      return userWithoutPassword;
    }
  }

  /**
   * Verify user password
   * - Used for authentication
   */
  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return bcrypt.compare(password, user.passwordHash);
  }

  /**
   * Change user password
   * - Requires old password verification
   */
  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid old password');
    }

    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await this.prisma.user.update({
      where: { id },
      data: { passwordHash: newPasswordHash },
    });

    return { message: 'Password changed successfully' };
  }

  /**
   * Get users by office
   * - Returns all users belonging to a specific office
   */
  async findByOffice(officeId: string) {
    const users = await this.prisma.user.findMany({
      where: {
        offices: {
          some: { id: officeId },
        },
      },
      include: {
        offices: true,
      },
    });

    return users.map(({ passwordHash, ...user }) => user);
  }

  /**
   * Get users by role
   * - Returns all users with a specific role
   */
  async findByRole(role: string) {
    const users = await this.prisma.user.findMany({
      where: {
        roles: {
          has: role,
        },
      },
      include: {
        offices: true,
      },
    });

    return users.map(({ passwordHash, ...user }) => user);
  }

  /**
   * Get users by status
   * - Returns all users with a specific status
   */
  async findByStatus(status: UserStatus) {
    const users = await this.prisma.user.findMany({
      where: { status },
      include: {
        offices: true,
      },
    });

    return users.map(({ passwordHash, ...user }) => user);
  }
}
