import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminsController {
    constructor(private readonly adminsService: AdminsService) { }

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
    deactivateOffice(@Param('id') id: string) {
        return this.adminsService.deactivateOffice(id);
    }

    /**
     * Activate an office
     * PATCH /admins/offices/:id/activate
     */
    @Patch('offices/:id/activate')
    @HttpCode(HttpStatus.OK)
    activateOffice(@Param('id') id: string) {
        return this.adminsService.activateOffice(id);
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
    ) {
        return this.adminsService.handleRequest(id, approve);
    }
}
