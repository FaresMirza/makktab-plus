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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserStatus } from 'prisma/src/generated/prisma-client/client';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtUser } from '../../common/helpers/tenant.helper';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin', 'manager', 'owner')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    return this.usersService.create(createUserDto, req.user as JwtUser);
  }

  /**
   * Paginated list, tenant-scoped.
   * GET /users?page=&limit=&role=&status=&officeId=
   */
  @Get()
  findAll(
    @Req() req: any,
    @Query() paging: PaginationQueryDto,
    @Query('officeId') officeId?: string,
    @Query('role') role?: string,
    @Query('status') status?: UserStatus,
  ) {
    if (officeId) {
      return this.usersService.findByOffice(officeId, req.user as JwtUser, paging);
    }
    if (role) {
      return this.usersService.findByRole(role, req.user as JwtUser, paging);
    }
    if (status) {
      return this.usersService.findByStatus(status, req.user as JwtUser, paging);
    }
    return this.usersService.findAll(req.user as JwtUser, paging);
  }

  /**
   * Lookup by username — admin-only (used for cross-office staff search).
   */
  @Get('username/:username')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  /**
   * Lookup by email — admin-only.
   */
  @Get('email/:email')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.usersService.findOne(id, req.user as JwtUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return this.usersService.update(id, updateUserDto, req.user as JwtUser);
  }

  @Patch(':id/password')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    return this.usersService.changePassword(
      id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
      req.user as JwtUser,
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin', 'manager', 'owner')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.usersService.remove(id, req.user as JwtUser, false);
  }

  @Delete(':id/permanent')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @HttpCode(HttpStatus.OK)
  removePermanent(@Param('id') id: string, @Req() req: any) {
    return this.usersService.remove(id, req.user as JwtUser, true);
  }
}
