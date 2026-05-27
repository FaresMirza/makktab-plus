/**
 * White-box unit test for TasksService.
 *
 * All collaborators (Prisma, helpers, tenant gate, repository) are mocked,
 * so these tests exercise the service's own decision logic — input
 * validation flow, status-only update branch in update(), etc. — without
 * touching a database.
 */
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatus } from 'prisma/src/generated/prisma-client/client';
import { TasksService } from './tasks.service';
import { TasksHelper } from './helpers/tasks.helper';
import { TasksRepository } from './queries/tasks.queries';
import { TenantHelper } from '../../common/helpers/tenant.helper';
import { PrismaService } from '../prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let tasksHelper: jest.Mocked<TasksHelper>;
  let tasksRepository: jest.Mocked<TasksRepository>;
  let tenantHelper: jest.Mocked<TenantHelper>;
  let prisma: { user: { findUnique: jest.Mock }; task: { findUnique: jest.Mock } };

  const ownerUser = {
    userId: 'pub-owner',
    username: 'owner',
    roles: ['owner'],
  };
  const employeeUser = {
    userId: 'pub-emp',
    username: 'emp',
    roles: ['employee'],
  };

  beforeEach(async () => {
    prisma = {
      user: { findUnique: jest.fn() },
      task: { findUnique: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksHelper,
          useValue: {
            validateProjectExists: jest.fn(),
            validateUserExists: jest.fn(),
            validateTaskExists: jest.fn(),
          },
        },
        {
          provide: TasksRepository,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: TenantHelper,
          useValue: {
            isPlatformAdmin: jest.fn().mockReturnValue(false),
            resolveOfficeId: jest.fn(),
            tryResolveOfficeId: jest.fn(),
            assertCanManageProject: jest.fn(),
          },
        },
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(TasksService);
    tasksHelper = module.get(TasksHelper);
    tasksRepository = module.get(TasksRepository);
    tenantHelper = module.get(TenantHelper);
  });

  describe('create', () => {
    const dto = {
      projectId: 'proj-pub',
      createdByUserId: 'creator-pub',
      assignedToUserId: 'assignee-pub',
      title: 'Write report',
      description: 'monthly report',
    };

    it('validates project/users, asserts manage perms, then delegates to repository', async () => {
      tasksHelper.validateProjectExists.mockResolvedValue({
        id: 10,
        officeId: 5,
        projectManagerUserId: 99,
      } as any);
      tasksHelper.validateUserExists
        .mockResolvedValueOnce({ id: 1 } as any) // creator
        .mockResolvedValueOnce({ id: 2 } as any); // assignee
      tenantHelper.assertCanManageProject.mockResolvedValue();
      tasksRepository.create.mockResolvedValue({ id: 1234 } as any);

      const result = await service.create(dto as any, ownerUser);

      expect(tasksHelper.validateProjectExists).toHaveBeenCalledWith('proj-pub');
      expect(tasksHelper.validateUserExists).toHaveBeenNthCalledWith(1, 'creator-pub', 'Creator');
      expect(tasksHelper.validateUserExists).toHaveBeenNthCalledWith(2, 'assignee-pub', 'Assignee');
      expect(tenantHelper.assertCanManageProject).toHaveBeenCalledWith(ownerUser, {
        officeId: 5,
        projectManagerUserId: 99,
      });
      expect(tasksRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Write report',
          projectId: 10,
          createdByUserId: 1,
          assignedToUserId: 2,
          status: TaskStatus.TODO,
          dueDate: null,
        }),
      );
      expect(result).toEqual({ id: 1234 });
    });

    it('propagates ForbiddenException from the tenant gate (no repo call)', async () => {
      tasksHelper.validateProjectExists.mockResolvedValue({
        id: 10,
        officeId: 5,
        projectManagerUserId: 99,
      } as any);
      tasksHelper.validateUserExists
        .mockResolvedValueOnce({ id: 1 } as any)
        .mockResolvedValueOnce({ id: 2 } as any);
      tenantHelper.assertCanManageProject.mockRejectedValue(
        new ForbiddenException('You cannot manage this project'),
      );

      await expect(service.create(dto as any, employeeUser)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(tasksRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('lets the assignee change status alone — without needing manage perms', async () => {
      tasksHelper.validateTaskExists.mockResolvedValue({ id: 77, publicId: 'task-pub' } as any);
      prisma.task.findUnique.mockResolvedValue({
        assignedToUserId: 42,
        project: { officeId: 5, projectManagerUserId: 99 },
      });
      prisma.user.findUnique.mockResolvedValue({ id: 42 });
      tasksRepository.update.mockResolvedValue({ id: 77, status: TaskStatus.DONE } as any);

      await service.update('task-pub', { status: TaskStatus.DONE } as any, employeeUser);

      expect(tenantHelper.assertCanManageProject).not.toHaveBeenCalled();
      expect(tasksRepository.update).toHaveBeenCalledWith(
        77,
        expect.objectContaining({
          status: TaskStatus.DONE,
          completedAt: expect.any(Date),
        }),
      );
    });

    it('falls back to manage-permission check when a non-assignee tries the same', async () => {
      tasksHelper.validateTaskExists.mockResolvedValue({ id: 77, publicId: 'task-pub' } as any);
      prisma.task.findUnique.mockResolvedValue({
        assignedToUserId: 42,
        project: { officeId: 5, projectManagerUserId: 99 },
      });
      prisma.user.findUnique.mockResolvedValue({ id: 999 }); // not the assignee
      tenantHelper.assertCanManageProject.mockRejectedValue(new ForbiddenException());

      await expect(
        service.update('task-pub', { status: TaskStatus.DONE } as any, employeeUser),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(tasksRepository.update).not.toHaveBeenCalled();
    });

    it('requires manage permission when the caller edits more than just status', async () => {
      tasksHelper.validateTaskExists.mockResolvedValue({ id: 77 } as any);
      prisma.task.findUnique.mockResolvedValue({
        assignedToUserId: 42,
        project: { officeId: 5, projectManagerUserId: 99 },
      });
      tenantHelper.assertCanManageProject.mockResolvedValue();
      tasksRepository.update.mockResolvedValue({ id: 77 } as any);

      await service.update(
        'task-pub',
        { status: TaskStatus.DONE, title: 'renamed' } as any,
        ownerUser,
      );

      expect(tenantHelper.assertCanManageProject).toHaveBeenCalled();
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('clears completedAt when status moves away from DONE', async () => {
      tasksHelper.validateTaskExists.mockResolvedValue({ id: 77 } as any);
      prisma.task.findUnique.mockResolvedValue({
        assignedToUserId: 42,
        project: { officeId: 5, projectManagerUserId: 99 },
      });
      prisma.user.findUnique.mockResolvedValue({ id: 42 });
      tasksRepository.update.mockResolvedValue({ id: 77 } as any);

      await service.update('task-pub', { status: TaskStatus.IN_PROGRESS } as any, employeeUser);

      expect(tasksRepository.update).toHaveBeenCalledWith(
        77,
        expect.objectContaining({ status: TaskStatus.IN_PROGRESS, completedAt: null }),
      );
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException when the task does not exist', async () => {
      const tasksRepoMock = tasksRepository as any;
      tasksRepoMock.findByPublicId = jest.fn().mockResolvedValue(null);

      await expect(service.findOne('missing', ownerUser)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
