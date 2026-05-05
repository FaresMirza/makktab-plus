/**
 * Reflection-level tests asserting that every sensitive controller
 * has the proper auth guards wired up at the class or handler level.
 *
 * These run fast (no app bootstrap needed) and catch the regression
 * "I removed the JWT guard by accident" without requiring a database
 * or full NestJS application context.
 */
import 'reflect-metadata';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { ROLES_KEY } from './common/decorators/roles.decorator';
import { TasksController } from './modules/tasks/tasks.controller';
import { UsersController } from './modules/users/users.controller';
import { OfficesController } from './modules/offices/offices.controller';
import { ProjectsController } from './modules/projects/projects.controller';

const GUARDS_METADATA = '__guards__';

function classGuards(target: any): any[] {
  return Reflect.getMetadata(GUARDS_METADATA, target) || [];
}

function methodGuards(target: any, method: string): any[] {
  return Reflect.getMetadata(GUARDS_METADATA, target.prototype[method]) || [];
}

function methodRoles(target: any, method: string): string[] {
  return Reflect.getMetadata(ROLES_KEY, target.prototype[method]) || [];
}

function handlerHasGuard(target: any, method: string, guard: any): boolean {
  const onClass = classGuards(target).some((g) => g === guard || g?.name === guard.name);
  const onMethod = methodGuards(target, method).some(
    (g) => g === guard || g?.name === guard.name,
  );
  return onClass || onMethod;
}

describe('Auth gates', () => {
  describe('TasksController', () => {
    it.each(['create', 'findAll', 'findOverdue', 'findOne', 'update', 'remove', 'removePermanent'])(
      '%s requires JwtAuthGuard',
      (method) => {
        expect(handlerHasGuard(TasksController, method, JwtAuthGuard)).toBe(true);
      },
    );
  });

  describe('UsersController', () => {
    it.each(['findAll', 'findByUsername', 'findByEmail', 'findOne', 'update', 'changePassword', 'create', 'remove', 'removePermanent'])(
      '%s requires JwtAuthGuard',
      (method) => {
        expect(handlerHasGuard(UsersController, method, JwtAuthGuard)).toBe(true);
      },
    );

    it('create is restricted to admin/manager/owner roles', () => {
      expect(handlerHasGuard(UsersController, 'create', RolesGuard)).toBe(true);
      const roles = methodRoles(UsersController, 'create');
      expect(roles).toEqual(expect.arrayContaining(['admin', 'super_admin', 'manager', 'owner']));
    });

    it('remove is role-restricted', () => {
      expect(handlerHasGuard(UsersController, 'remove', RolesGuard)).toBe(true);
      expect(methodRoles(UsersController, 'remove').length).toBeGreaterThan(0);
    });

    it('removePermanent is admin-only', () => {
      expect(handlerHasGuard(UsersController, 'removePermanent', RolesGuard)).toBe(true);
      const roles = methodRoles(UsersController, 'removePermanent');
      expect(roles).toEqual(expect.arrayContaining(['admin', 'super_admin']));
      expect(roles).not.toEqual(expect.arrayContaining(['manager', 'owner', 'employee']));
    });

    it('cross-office username/email lookups are admin-only', () => {
      for (const m of ['findByUsername', 'findByEmail']) {
        expect(handlerHasGuard(UsersController, m, RolesGuard)).toBe(true);
        const roles = methodRoles(UsersController, m);
        expect(roles).toEqual(expect.arrayContaining(['admin', 'super_admin']));
      }
    });
  });

  describe('OfficesController', () => {
    it.each(['create', 'findAll', 'findByOwner', 'getStatistics', 'findOne', 'update', 'remove', 'removePermanent'])(
      '%s requires JwtAuthGuard',
      (method) => {
        expect(handlerHasGuard(OfficesController, method, JwtAuthGuard)).toBe(true);
      },
    );

    it.each(['create', 'update', 'remove'])('%s is restricted to admins', (method) => {
      expect(handlerHasGuard(OfficesController, method, RolesGuard)).toBe(true);
      const roles = methodRoles(OfficesController, method);
      expect(roles).toEqual(expect.arrayContaining(['admin', 'super_admin']));
    });

    it('removePermanent is super_admin-only', () => {
      const roles = methodRoles(OfficesController, 'removePermanent');
      expect(roles).toEqual(['super_admin']);
    });
  });

  describe('ProjectsController', () => {
    it.each(['getStatistics', 'findOne', 'create', 'findAll', 'update', 'remove'])(
      '%s requires JwtAuthGuard',
      (method) => {
        expect(handlerHasGuard(ProjectsController, method, JwtAuthGuard)).toBe(true);
      },
    );
  });
});
