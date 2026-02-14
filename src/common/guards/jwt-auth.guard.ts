import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that requires a valid JWT Bearer token.
 * Populates `req.user` with the decoded payload from JwtStrategy.validate().
 *
 * Usage:
 *   @UseGuards(JwtAuthGuard)
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
