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
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtUser } from '../../common/helpers/tenant.helper';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

@Controller('offices')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}))
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  /**
   * Paginated list, tenant-scoped (non-admin sees only their own office).
   * GET /offices?page=&limit=&status=
   */
  @Get()
  findAll(
    @Req() req: any,
    @Query() paging: PaginationQueryDto,
    @Query('status') status?: OfficeStatus,
  ) {
    if (status) {
      return this.officesService.findByStatus(status, req.user as JwtUser, paging);
    }
    return this.officesService.findAll(req.user as JwtUser, paging);
  }

  @Get('owner/:ownerUserId')
  findByOwner(@Param('ownerUserId') ownerUserId: string, @Req() req: any) {
    return this.officesService.findByOwner(ownerUserId, req.user as JwtUser);
  }

  @Get(':id/statistics')
  getStatistics(@Param('id') id: string, @Req() req: any) {
    return this.officesService.getStatistics(id, req.user as JwtUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.officesService.findOne(id, req.user as JwtUser);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.officesService.remove(id, false);
  }

  @Delete(':id/permanent')
  @UseGuards(RolesGuard)
  @Roles('super_admin')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string) {
    return this.officesService.remove(id, true);
  }
}
