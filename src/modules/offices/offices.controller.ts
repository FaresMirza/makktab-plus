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
  UsePipes
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeStatus } from 'prisma/src/generated/prisma-client/client';

@Controller('offices')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  /**
   * Create a new office
   * POST /offices
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  /**
   * Get all offices with optional filters
   * GET /offices?status=xxx
   */
  @Get()
  findAll(
    @Query('status') status?: OfficeStatus,
  ) {
    if (status) {
      return this.officesService.findByStatus(status);
    }
    return this.officesService.findAll();
  }

  /**
   * Get office by owner user ID
   * GET /offices/owner/:ownerUserId
   */
  @Get('owner/:ownerUserId')
  findByOwner(@Param('ownerUserId') ownerUserId: string) {
    return this.officesService.findByOwner(ownerUserId);
  }

  /**
   * Get office statistics
   * GET /offices/:id/statistics
   */
  @Get(':id/statistics')
  getStatistics(@Param('id') id: string) {
    return this.officesService.getStatistics(id);
  }

  /**
   * Get a specific office by ID
   * GET /offices/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(id);
  }

  /**
   * Update an existing office
   * PATCH /offices/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(id, updateOfficeDto);
  }

  /**
   * Soft delete an office (suspend)
   * DELETE /offices/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.officesService.remove(id, false);
  }

  /**
   * Hard delete an office (permanent)
   * DELETE /offices/:id/permanent
   */
  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string) {
    return this.officesService.remove(id, true);
  }
}
