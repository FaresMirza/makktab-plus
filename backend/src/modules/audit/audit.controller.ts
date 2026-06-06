import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtUser } from '../../common/helpers/tenant.helper';
import { AuditService } from './audit.service';

@ApiTags('Audit')
@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
    constructor(private readonly auditService: AuditService) { }

    @Get('office')
    @Roles('owner', 'manager')
    @ApiOperation({ summary: 'Get audit logs for the caller office' })
    getOfficeAudit(@Req() req: any) {
        return this.auditService.getOfficeAuthLogs(req.user as JwtUser);
    }
}
