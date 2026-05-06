import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../../../prisma/src/generated/prisma-client/client';

@Injectable()
export class ProjectFilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get uploaderSelect(): Prisma.UserSelect {
    return {
      id: true,
      publicId: true,
      fullName: true,
      email: true,
      username: true,
    };
  }

  async create(data: Prisma.ProjectFileUncheckedCreateInput) {
    return this.prisma.projectFile.create({
      data,
      include: {
        uploadedBy: { select: this.uploaderSelect },
      },
    });
  }

  async findByProjectId(projectId: number) {
    return this.prisma.projectFile.findMany({
      where: { projectId },
      include: {
        uploadedBy: { select: this.uploaderSelect },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTaskId(taskId: number) {
    return this.prisma.projectFile.findMany({
      where: { taskId },
      include: {
        uploadedBy: { select: this.uploaderSelect },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPublicId(publicId: string) {
    return this.prisma.projectFile.findUnique({
      where: { publicId },
      include: {
        uploadedBy: { select: this.uploaderSelect },
        project: {
          select: {
            id: true,
            publicId: true,
            officeId: true,
            projectManagerUserId: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.projectFile.delete({
      where: { id },
    });
  }
}
