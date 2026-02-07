import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { CreateLoginAttemptDto } from './dto/create-login-attempt.dto';
import { LoginMethod } from 'prisma/src/generated/prisma-client/client';

@Controller('login-attempts')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class LoginAttemptsController {
  constructor(private readonly loginAttemptsService: LoginAttemptsService) {}

  /**
   * Create a new login attempt record
   * POST /login-attempts
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLoginAttemptDto: CreateLoginAttemptDto) {
    return this.loginAttemptsService.create(createLoginAttemptDto);
  }

  /**
   * Get all login attempts with optional filters
   * GET /login-attempts?userId=xxx&officeId=xxx&method=xxx
   */
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('officeId') officeId?: string,
    @Query('method') method?: LoginMethod,
  ) {
    if (userId) {
      return this.loginAttemptsService.findByUser(userId);
    }
    if (officeId) {
      return this.loginAttemptsService.findByOffice(officeId);
    }
    if (method) {
      return this.loginAttemptsService.findByMethod(method);
    }
    return this.loginAttemptsService.findAll();
  }

  /**
   * Get failed login attempts
   * GET /login-attempts/failed
   */
  @Get('failed')
  findFailed() {
    return this.loginAttemptsService.findFailed();
  }

  /**
   * Get successful login attempts
   * GET /login-attempts/successful
   */
  @Get('successful')
  findSuccessful() {
    return this.loginAttemptsService.findSuccessful();
  }

  /**
   * Get login statistics for a user
   * GET /login-attempts/statistics/:userId
   */
  @Get('statistics/:userId')
  getUserStatistics(@Param('userId') userId: string) {
    return this.loginAttemptsService.getUserStatistics(userId);
  }

  /**
   * Get a specific login attempt by ID
   * GET /login-attempts/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginAttemptsService.findOne(id);
  }

  /**
   * Delete a login attempt
   * DELETE /login-attempts/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.loginAttemptsService.remove(id);
  }
}
