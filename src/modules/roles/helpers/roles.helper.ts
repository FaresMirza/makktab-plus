import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { RolesRepository } from '../queries/roles.queries';

@Injectable()
export class RolesHelper {
    constructor(private readonly rolesRepository: RolesRepository) { }

    /**
     * Validate that a role key is unique
     */
    async validateKeyUnique(key: string, excludeRoleId?: string) {
        if (!key) return;

        const role = await this.rolesRepository.findByKey(key);

        if (role && role.id !== excludeRoleId) {
            throw new ConflictException(`Role with key '${key}' already exists`);
        }
    }

    /**
     * Validate role existence
     */
    async validateRoleExists(id: string) {
        const role = await this.rolesRepository.findById(id);

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        return role;
    }
}
