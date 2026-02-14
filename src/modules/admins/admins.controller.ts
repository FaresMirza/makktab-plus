import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

/**
 * AdminsController
 *
 * Every route in this controller requires:
 *   1. A valid JWT token  (JwtAuthGuard)
 *   2. The "admin" role    (RolesGuard + @Roles('admin'))
 *
 * The guards are applied at the class level so all endpoints
 * are automatically protected.
 */
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) { }

    // ─── USER MANAGEMENT ────────────────────────────────────────

    /**
     * Get all users (admin view)
     * GET /admins/users
     */
    @Get('users')
    findAllUsers(@Query('status') status?: string, @Query('officeId') officeId?: string) {
        return this.adminsService.findAllUsers(status, officeId);
    }

    /**
     * Get a specific user by publicId (admin view)
     * GET /admins/users/:id
     */
    @Get('users/:id')
    findUser(@Param('id') id: string) {
        return this.adminsService.findUser(id);
    }

    /**
     * Update a user's roles
     * PATCH /admins/users/:id/roles
     */
    @Patch('users/:id/roles')
    updateUserRoles(@Param('id') id: string, @Body('roles') roles: string[]) {
        return this.adminsService.updateUserRoles(id, roles);
    }

    /**
     * Update a user's status (activate, suspend, lock, etc.)
     * PATCH /admins/users/:id/status
     */
    @Patch('users/:id/status')
    updateUserStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.adminsService.updateUserStatus(id, status);
    }

    /**
     * Hard delete a user (permanent, admin only)
     * DELETE /admins/users/:id
     */
    @Delete('users/:id')
    @HttpCode(HttpStatus.OK)
    removeUser(@Param('id') id: string) {
        return this.adminsService.removeUser(id);
    }

    // ─── OFFICE MANAGEMENT ──────────────────────────────────────

    /**
     * Get all offices (admin view)
     * GET /admins/offices
     */
    @Get('offices')
    findAllOffices(@Query('status') status?: string) {
        return this.adminsService.findAllOffices(status);
    }

    /**
     * Update an office status (e.g., suspend)
     * PATCH /admins/offices/:id/status
     */
    @Patch('offices/:id/status')
    updateOfficeStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.adminsService.updateOfficeStatus(id, status);
    }

    // ─── AUDIT LOGS ─────────────────────────────────────────────

    /**
     * Get all auth audit logs
     * GET /admins/audit/auth
     */
    @Get('audit/auth')
    getAuthAuditLogs() {
        return this.adminsService.getAuthAuditLogs();
    }

    /**
     * Get auth audit logs for a specific user (by publicId)
     * GET /admins/audit/auth/user/:userId
     */
    @Get('audit/auth/user/:userId')
    getAuthAuditLogsByUser(@Param('userId') userId: string) {
        return this.adminsService.getAuthAuditLogsByUser(userId);
    }
}
