import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * RolesGuard
 *
 * Must be used **after** the JwtAuthGuard so that `req.user` is populated.
 *
 * Reads the roles set by the @Roles() decorator and checks whether
 * the authenticated user's `roles` array contains at least one match.
 *
 * If no @Roles() decorator is present on the handler or controller,
 * the guard allows the request through (public by default).
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Merge roles from both handler-level and class-level decorators
        const requiredRoles = this.reflector.getAllAndMerge<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // No roles required → allow
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.roles) {
            throw new ForbiddenException('Access denied: no roles found in token');
        }

        const hasRole = requiredRoles.some((role) => user.roles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException(
                `Access denied: requires one of [${requiredRoles.join(', ')}]`,
            );
        }

        return true;
    }
}
