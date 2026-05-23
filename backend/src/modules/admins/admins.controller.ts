import {
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
    Ip,
    Headers,
    NotFoundException,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@ApiTags('Admins')
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly prisma: PrismaService,
    ) { }

    /**
     * Get all admins and super_admins
     * GET /admins
     */
    @Get()
    @Roles('super_admin', 'admin') // Stacked explicitly just like POST
    @ApiOperation({ summary: 'Get a list of all platform admins' })
    async getAllAdmins(@Req() req: any) {
        const currentUserPublicId = req.user.userId;
        return this.prisma.user.findMany({
            where: {
                roles: {
                    hasSome: ['admin', 'super_admin'],
                },
                email: {
                    not: 'admin@makktabplus.online',
                },
                publicId: {
                    not: currentUserPublicId,
                }
            },
            select: {
                publicId: true,
                fullName: true,
                username: true,
                email: true,
                phone: true,
                status: true,
                roles: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Get all offices
     * GET /admins/offices
     */
    @Get('offices')
    getAllOffices() {
        return this.adminsService.getAllOffices();
    }

    /**
     * Get admin dashboard statistics
     * GET /admins/stats
     */
    @Get('stats')
    @Roles('super_admin', 'admin')
    @ApiOperation({ summary: 'Get admin dashboard statistics' })
    async getDashboardStats() {
        // Exclude offices where owner has admin/super_admin roles
        const activeOfficesCount = await this.prisma.office.count({
            where: {
                AND: [
                    { status: 'ACTIVE' },
                    {
                        NOT: {
                            owner: {
                                roles: {
                                    hasSome: ['admin', 'super_admin'],
                                },
                            },
                        },
                    },
                ],
            },
        });

        const totalOfficesCount = await this.prisma.office.count({
            where: {
                NOT: {
                    owner: {
                        roles: {
                            hasSome: ['admin', 'super_admin'],
                        },
                    },
                },
            },
        });

        const totalAdminsCount = await this.prisma.user.count({
            where: {
                roles: {
                    hasSome: ['admin', 'super_admin'],
                },
            },
        });

        const totalUsersCount = await this.prisma.user.count();

        // Fetch recent admin audit logs
        const recentLogs = await this.prisma.adminAuditLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                admin: {
                    select: {
                        publicId: true,
                        fullName: true,
                        username: true,
                        email: true,
                    },
                },
                targetOffice: {
                    select: {
                        publicId: true,
                        name: true,
                    },
                },
            },
        });

        return {
            activeOfficesCount,
            totalOfficesCount,
            totalAdminsCount,
            totalUsersCount,
            recentLogs,
        };
    }

    /**
     * Get office details
     * GET /admins/offices/:id
     */
    @Get('offices/:id')
    getOffice(@Param('id') id: string) {
        return this.adminsService.getOffice(id);
    }

    /**
     * Deactivate (suspend) an office
     * PATCH /admins/offices/:id/deactivate
     */
    @Patch('offices/:id/deactivate')
    @HttpCode(HttpStatus.OK)
    deactivateOffice(
        @Param('id') id: string,
        @Req() req: any,
        @Ip() ip: string,
        @Headers('x-device-fingerprint') deviceFingerprint: string,
    ) {
        const auditMeta = {
            adminPublicId: req.user.userId,
            ip,
            userAgent: req.headers['user-agent'],
            deviceFingerprint,
        };
        return this.adminsService.deactivateOffice(id, auditMeta);
    }

    /**
     * Activate an office
     * PATCH /admins/offices/:id/activate
     */
    @Patch('offices/:id/activate')
    @HttpCode(HttpStatus.OK)
    activateOffice(
        @Param('id') id: string,
        @Req() req: any,
        @Ip() ip: string,
        @Headers('x-device-fingerprint') deviceFingerprint: string,
    ) {
        const auditMeta = {
            adminPublicId: req.user.userId,
            ip,
            userAgent: req.headers['user-agent'],
            deviceFingerprint,
        };
        return this.adminsService.activateOffice(id, auditMeta);
    }

    /**
     * Get all pending office requests
     * GET /admins/office-requests
     */
    @Get('office-requests')
    getPendingRequests() {
        return this.adminsService.getPendingRequests();
    }

    /**
     * Handle office request: approve or reject
     * PATCH /admins/office-requests/:id
     * Body: { "approve": true } or { "approve": false }
     */
    @Patch('office-requests/:id')
    @HttpCode(HttpStatus.OK)
    handleRequest(
        @Param('id') id: string,
        @Body('approve') approve: boolean,
        @Req() req: any,
        @Ip() ip: string,
        @Headers('x-device-fingerprint') deviceFingerprint: string,
    ) {
        const auditMeta = {
            adminPublicId: req.user.userId,
            ip,
            userAgent: req.headers['user-agent'],
            deviceFingerprint,
        };
        return this.adminsService.handleRequest(id, approve, auditMeta);
    }
    /**
     * Get the last audit log for the admins
     * GET /admins/audit/last
     */
    @Get('audit/last')
    getLastAdminAudit() {
        return this.adminsService.getLastAdminLog();
    }

    /**
     * Get all audit logs for the admins
     * GET /admins/audit
     */
    @Get('audit')
    getLast100AdminAudits() {
        return this.adminsService.getLast100AdminLogs();
    }

    /**
     * Create a new platform admin user
     * POST /admins
     */
    @Post()
    @Roles('super_admin', 'admin') // Note: Roles are merged with class-level @Roles('admin')
    @ApiOperation({ summary: 'Create a new admin user' })
    async createAdmin(@Body() createAdminDto: CreateAdminDto) {
        const { email, username, password, fullName } = createAdminDto;
        
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        return this.prisma.user.create({
            data: {
                email,
                username,
                fullName,
                phone: '0000000000', // required dummy value as observed
                passwordHash,
                roles: ['admin'],
                status: 'ACTIVE',
            },
        });
    }

    /**
     * Toggle admin status (ACTIVE <-> SUSPENDED)
     * PATCH /admins/:id/status
     */
    @Patch(':id/status')
    @Roles('super_admin', 'admin')
    @ApiOperation({ summary: 'Toggle the status of an admin user' })
    async toggleAdminStatus(@Param('id') id: string, @Req() req: any) {
        const admin = await this.prisma.user.findUnique({
            where: { publicId: id },
        });

        if (!admin || !admin.roles.some((role) => ['admin', 'super_admin'].includes(role))) {
            throw new NotFoundException('Admin user not found');
        }

        if (admin.email === 'admin@makktabplus.online') {
            throw new ForbiddenException('Cannot modify the primary platform admin');
        }

        if (admin.publicId === req.user.userId) {
            throw new ForbiddenException('Cannot modify your own status');
        }

        const newStatus = admin.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        return this.prisma.user.update({
            where: { id: admin.id },
            data: { status: newStatus },
            select: {
                publicId: true,
                status: true,
                email: true,
            }
        });
    }

    /**
     * Delete an admin user
     * DELETE /admins/:id
     */
    @Delete(':id')
    @Roles('super_admin', 'admin')
    @ApiOperation({ summary: 'Delete an admin user' })
    async deleteAdmin(@Param('id') id: string, @Req() req: any) {
        const admin = await this.prisma.user.findUnique({
            where: { publicId: id },
            include: {
                ownedOffice: { select: { publicId: true, name: true } },
                _count: {
                    select: {
                        createdProjects: true,
                        managedProjects: true,
                        createdTasks: true,
                        assignedTasks: true,
                        uploadedProjectFiles: true,
                    },
                },
            },
        });

        if (!admin || !admin.roles.some((role) => ['admin', 'super_admin'].includes(role))) {
            throw new NotFoundException('Admin user not found');
        }

        if (admin.email === 'admin@makktabplus.online') {
            throw new ForbiddenException('Cannot delete the primary platform admin');
        }

        if (admin.publicId === req.user.userId) {
            throw new ForbiddenException('Cannot delete yourself');
        }

        // Refuse if the user still has tenant data hanging off them — deleting
        // would either fail with P2003 (Office_ownerUserId_fkey, etc.) or
        // silently orphan/cascade-destroy unrelated office data.
        if (admin.ownedOffice) {
            throw new ConflictException(
                `Cannot delete: user owns office "${admin.ownedOffice.name}". Reassign or delete the office first.`,
            );
        }
        const refs = admin._count;
        const blockers: string[] = [];
        if (refs.createdProjects) blockers.push(`${refs.createdProjects} project(s) created`);
        if (refs.managedProjects) blockers.push(`${refs.managedProjects} project(s) managed`);
        if (refs.createdTasks) blockers.push(`${refs.createdTasks} task(s) created`);
        if (refs.assignedTasks) blockers.push(`${refs.assignedTasks} task(s) assigned`);
        if (refs.uploadedProjectFiles) blockers.push(`${refs.uploadedProjectFiles} file(s) uploaded`);
        if (blockers.length > 0) {
            throw new ConflictException(
                `Cannot delete: user still has ${blockers.join(', ')}. Reassign or delete those first.`,
            );
        }

        // Cascade-delete every audit log that holds a FK to this user.
        // None of the User audit relations declare onDelete: Cascade.
        return this.prisma.$transaction([
            this.prisma.otpCode.deleteMany({ where: { userId: admin.id } }),
            this.prisma.adminAuditLog.deleteMany({ where: { adminUserId: admin.id } }),
            this.prisma.authAuditLog.deleteMany({ where: { userId: admin.id } }),
            this.prisma.projectAuditLog.deleteMany({ where: { actorUserId: admin.id } }),
            this.prisma.taskAuditLog.deleteMany({ where: { actorUserId: admin.id } }),
            this.prisma.user.delete({
                where: { id: admin.id },
                select: { publicId: true, email: true },
            }),
        ]);
    }
}
