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
  ForbiddenException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Get project statistics (with tenant isolation)
   * GET /projects/:id/statistics
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id/statistics')
  async getStatistics(@Param('id') id: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectsService.getStatisticsForAuthenticatedUser(id, userPublicId);
  }

  /**
   * Get a specific project by ID (with tenant isolation)
   * GET /projects/:id
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectsService.findOneForAuthenticatedUser(id, userPublicId);
  }

  /**
   * Create a new project (authenticated users only)
   * POST /projects
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    return this.projectsService.create(createProjectDto);
  }

  /**
   * Get all projects for the authenticated user's office
   * Enforces tenant isolation - user can only see projects belonging to their office
   * GET /projects?status=xxx&projectManagerUserId=xxx
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() req: any,
    @Query('status') status?: ProjectStatus,
    @Query('projectManagerUserId') projectManagerUserId?: string,
  ) {
    const userPublicId = req.user.userId;
    return this.projectsService.findAllForAuthenticatedUser(
      userPublicId,
      status,
      projectManagerUserId,
    );
  }

  /**
   * Update an existing project (with tenant isolation)
   * PATCH /projects/:id
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: any,
  ) {
    const userPublicId = req.user.userId;
    return this.projectsService.updateForAuthenticatedUser(id, updateProjectDto, userPublicId);
  }

  /**
   * Soft delete a project (cancel) - with tenant isolation
   * DELETE /projects/:id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectsService.removeForAuthenticatedUser(id, userPublicId, false);
  }

  /**
   * Hard delete a project (permanent) - with tenant isolation
   * DELETE /projects/:id/permanent
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  async removePermanent(@Param('id') id: string, @Req() req: any) {
    const userPublicId = req.user.userId;
    return this.projectsService.removeForAuthenticatedUser(id, userPublicId, true);
  }
}
