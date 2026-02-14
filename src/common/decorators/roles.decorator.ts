import { SetMetadata } from '@nestjs/common';

/**
 * Key used to store role metadata on route handlers.
 */
export const ROLES_KEY = 'roles';

/**
 * @Roles('admin', 'manager')
 * Marks a route/controller so that only users whose JWT `roles` array
 * includes at least one of the listed roles are allowed through.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
