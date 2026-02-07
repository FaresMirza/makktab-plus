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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from 'prisma/src/generated/prisma-client/client';

@Controller('projects')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * Create a new project
   * POST /projects
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  /**
   * Get all projects with optional filters
   * GET /projects?officeId=xxx&status=xxx&projectManagerUserId=xxx
   */
  @Get()
  findAll(
    @Query('officeId') officeId?: string,
    @Query('status') status?: ProjectStatus,
    @Query('projectManagerUserId') projectManagerUserId?: string,
  ) {
    if (officeId) {
      return this.projectsService.findByOffice(officeId);
    }
    if (status) {
      return this.projectsService.findByStatus(status);
    }
    if (projectManagerUserId) {
      return this.projectsService.findByProjectManager(projectManagerUserId);
    }
    return this.projectsService.findAll();
  }

  /**
   * Get project statistics
   * GET /projects/:id/statistics
   */
  @Get(':id/statistics')
  getStatistics(@Param('id') id: string) {
    return this.projectsService.getStatistics(id);
  }

  /**
   * Get a specific project by ID
   * GET /projects/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  /**
   * Update an existing project
   * PATCH /projects/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  /**
   * Soft delete a project (cancel)
   * DELETE /projects/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id, false);
  }

  /**
   * Hard delete a project (permanent)
   * DELETE /projects/:id/permanent
   */
  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string) {
    return this.projectsService.remove(id, true);
  }
}
