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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';

@Controller('users')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * POST /users
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get all users with optional filters
   * GET /users?officeId=xxx&role=xxx&status=xxx
   */
  @Get()
  findAll(
    @Query('officeId') officeId?: string,
    @Query('role') role?: string,
    @Query('status') status?: UserStatus,
  ) {
    if (officeId) {
      return this.usersService.findByOffice(officeId);
    }
    if (role) {
      return this.usersService.findByRole(role);
    }
    if (status) {
      return this.usersService.findByStatus(status);
    }
    return this.usersService.findAll();
  }

  /**
   * Get user by username
   * GET /users/username/:username
   */
  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  /**
   * Get user by email
   * GET /users/email/:email
   */
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  /**
   * Get a specific user by ID
   * GET /users/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Update an existing user
   * PATCH /users/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Change user password
   * PATCH /users/:id/password
   */
  @Patch(':id/password')
  changePassword(
    @Param('id') id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.usersService.changePassword(id, oldPassword, newPassword);
  }

  /**
   * Soft delete a user (deactivate)
   * DELETE /users/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id, false);
  }

  /**
   * Hard delete a user (permanent)
   * DELETE /users/:id/permanent
   */
  @Delete(':id/permanent')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string) {
    return this.usersService.remove(id, true);
  }
}
