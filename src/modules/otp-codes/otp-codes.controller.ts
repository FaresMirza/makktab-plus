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
import { OtpCodesService } from './otp-codes.service';
import { CreateOtpCodeDto } from './dto/create-otp-code.dto';
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto';
import { OtpPurpose } from 'prisma/src/generated/prisma-client/client';

@Controller('otp-codes')
@UsePipes(new ValidationPipe({ 
  whitelist: true, 
  forbidNonWhitelisted: true,
  transform: true 
}))
export class OtpCodesController {
  constructor(private readonly otpCodesService: OtpCodesService) {}

  /**
   * Generate a new OTP code
   * POST /otp-codes
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOtpCodeDto: CreateOtpCodeDto) {
    return this.otpCodesService.create(createOtpCodeDto);
  }

  /**
   * Verify an OTP code
   * POST /otp-codes/verify
   */
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() verifyOtpCodeDto: VerifyOtpCodeDto) {
    return this.otpCodesService.verify(verifyOtpCodeDto);
  }

  /**
   * Get all OTP codes with optional filters
   * GET /otp-codes?userId=xxx&purpose=xxx
   */
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('purpose') purpose?: OtpPurpose,
  ) {
    if (userId) {
      return this.otpCodesService.findByUser(userId);
    }
    if (purpose) {
      return this.otpCodesService.findByPurpose(purpose);
    }
    return this.otpCodesService.findAll();
  }

  /**
   * Get expired OTP codes
   * GET /otp-codes/expired
   */
  @Get('expired')
  findExpired() {
    return this.otpCodesService.findExpired();
  }

  /**
   * Get a specific OTP code by ID
   * GET /otp-codes/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otpCodesService.findOne(id);
  }

  /**
   * Delete an OTP code
   * DELETE /otp-codes/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.otpCodesService.remove(id);
  }
}
