import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { RolesHelper } from './helpers/roles.helper';
import { RolesRepository } from './queries/roles.queries';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesHelper: RolesHelper,
    private readonly rolesRepository: RolesRepository,
  ) { }

  /**
   * Create a new role
   * - Validates that role key is unique
   * - Used for defining permissions and access control
   */
  async create(createRoleDto: CreateRoleDto) {
    const { key, scope, name, description } = createRoleDto;

    // Check if role key already exists
    await this.rolesHelper.validateKeyUnique(key);

    const role = await this.rolesRepository.create({
      key,
      scope,
      name,
      description,
    });

    return role;
  }

  /**
   * Get all roles
   * - Returns all roles in the system
   */
  async findAll() {
    return this.rolesRepository.findAll();
  }

  /**
   * Get a specific role by ID
   * - Returns role details
   */
  async findOne(id: string) {
    // Use helper to validate existence or just use repository and throw if not found
    return this.rolesHelper.validateRoleExists(id);
  }

  /**
   * Get role by key
   * - Returns role by its unique key identifier
   */
  async findByKey(key: string) {
    const role = await this.rolesRepository.findByKey(key);

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
    return this.rolesRepository.findByScope(scope);
  }

  /**
   * Update a role
   * - Cannot update the key (unique identifier)
   * - Can update scope, name, and description
   */
  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // Check if role exists
    await this.rolesHelper.validateRoleExists(id);

    const updatedRole = await this.rolesRepository.update(id, updateRoleDto);

    return updatedRole;
  }

  /**
   * Delete a role
   * - Permanently removes the role
   * - Use with caution as this may affect users with this role
   */
  async remove(id: string) {
    // Check if role exists
    await this.rolesHelper.validateRoleExists(id);

    await this.rolesRepository.delete(id);

    return { message: 'Role permanently deleted' };
  }
}
