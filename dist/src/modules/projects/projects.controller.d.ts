import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
        office: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    }>;
    findAll(officeId?: string, status?: ProjectStatus, projectManagerUserId?: string): Promise<({
        _count: {
            tasks: number;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    })[]> | Promise<({
        office: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            name: string;
        };
        _count: {
            tasks: number;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    })[]>;
    getStatistics(id: string): Promise<{
        projectId: string;
        projectName: string;
        status: ProjectStatus;
        statistics: {
            totalTasks: number;
            tasksByStatus: Record<string, number>;
        };
    }>;
    findOne(id: string): Promise<{
        office: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        tasks: {
            description: string | null;
            title: string;
            status: import("prisma/src/generated/prisma-client/client").TaskStatus;
            id: string;
            createdAt: Date;
            dueDate: Date | null;
            assignedTo: {
                fullName: string;
                email: string;
                id: string;
            };
        }[];
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        office: {
            status: import("prisma/src/generated/prisma-client/client").OfficeStatus;
            id: string;
            name: string;
        };
        _count: {
            tasks: number;
        };
        createdBy: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            username: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    }>;
    remove(id: string): Promise<({
        office: {
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    }) | {
        message: string;
    }>;
    removePermanent(id: string): Promise<({
        office: {
            id: string;
            name: string;
        };
        createdBy: {
            fullName: string;
            email: string;
            id: string;
        };
        projectManager: {
            fullName: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        status: ProjectStatus;
        officeId: string;
        id: string;
        createdAt: Date;
        name: string;
        createdByUserId: string;
        projectManagerUserId: string;
    }) | {
        message: string;
    }>;
}
