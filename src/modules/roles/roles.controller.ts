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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Create a new role
   * POST /roles
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  /**
   * Get all roles with optional filters
   * GET /roles?scope=xxx
   */
  @Get()
  findAll(@Query('scope') scope?: string) {
    if (scope) {
      return this.rolesService.findByScope(scope);
    }
    return this.rolesService.findAll();
  }

  /**
   * Get role by key
   * GET /roles/key/:key
   */
  @Get('key/:key')
  findByKey(@Param('key') key: string) {
    return this.rolesService.findByKey(key);
  }

  /**
   * Get a specific role by ID
   * GET /roles/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  /**
   * Update an existing role
   * PATCH /roles/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  /**
   * Delete a role (permanent)
   * DELETE /roles/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
