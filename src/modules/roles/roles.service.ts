import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new role
   * - Validates that role key is unique
   * - Used for defining permissions and access control
   */
  async create(createRoleDto: CreateRoleDto) {
    const { key, scope, name, description } = createRoleDto;

    // Check if role key already exists
    const existingRole = await this.prisma.role.findUnique({
      where: { key },
    });

    if (existingRole) {
      throw new ConflictException(`Role with key '${key}' already exists`);
    }

    const role = await this.prisma.role.create({
      data: {
        key,
        scope,
        name,
        description,
      },
    });

    return role;
  }

  /**
   * Get all roles
   * - Returns all roles in the system
   */
  async findAll() {
    const roles = await this.prisma.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return roles;
  }

  /**
   * Get a specific role by ID
   * - Returns role details
   */
  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  /**
   * Get role by key
   * - Returns role by its unique key identifier
   */
  async findByKey(key: string) {
    const role = await this.prisma.role.findUnique({
      where: { key },
    });

    if (!role) {
      throw new NotFoundException(`Role with key '${key}' not found`);
    }

    return role;
  }

  /**
   * Get roles by scope
   * - Returns all roles for a specific scope (office, project, task)
   */
  async findByScope(scope: string) {
    const roles = await this.prisma.role.findMany({
      where: { scope },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return roles;
  }

  /**
   * Update a role
   * - Cannot update the key (unique identifier)
   * - Can update scope, name, and description
   */
  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // Check if role exists
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });

    return updatedRole;
  }

  /**
   * Delete a role
   * - Permanently removes the role
   * - Use with caution as this may affect users with this role
   */
  async remove(id: string) {
    // Check if role exists
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    await this.prisma.role.delete({
      where: { id },
    });

    return { message: 'Role permanently deleted' };
  }
}
