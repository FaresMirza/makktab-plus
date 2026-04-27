import {
    Controller,
    Get,
    Patch,
    Post,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
    Ip,
    Headers,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UserStatus } from '../../../prisma/src/generated/prisma-client';

@ApiTags('Admins')
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly prisma: PrismaService,
    ) { }

    /**
     * Get all offices
     * GET /admins/offices
     */
    @Get('offices')
    getAllOffices() {
        return this.adminsService.getAllOffices();
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
     * Get the last audit log for the current admin
     * GET /admins/audit/last
     */
    @Get('audit/last')
    getLastAdminAudit(@Req() req: any) {
        return this.adminsService.getLastAdminLog(req.user.userId);
    }

    /**
     * Get the last 100 audit logs for the current admin
     * GET /admins/audit
     */
    @Get('audit')
    getLast100AdminAudits(@Req() req: any) {
        return this.adminsService.getLast100AdminLogs(req.user.userId);
    }

    /**
     * TEMP: Create an admin user bypassing JWT (for initial setup)
     * POST /admins/temp-create-admin
     */
    @Public()
    @Post('temp-create-admin')
    @ApiOperation({ summary: 'TEMPORARY: Create an admin user without auth' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                username: { type: 'string' },
                password: { type: 'string' },
                fullName: { type: 'string' },
            },
        },
    })
    async tempCreateAdmin(@Body() body: any) {
        const { email, username, password, fullName } = body;
        
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        return this.prisma.user.create({
            data: {
                email,
                username,
                fullName,
                phone: '0000000000', // required dummy value
                passwordHash,
                roles: ['admin'],
                status: 'ACTIVE',
            },
        });
    }
}
