import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { Request } from 'express';
import { ThrottlerStorageService } from '../storage/throttler-storage.service';

/**
 * Enhanced Throttler Guard with IP blocking
 * - Extracts real client IP from proxy headers
 * - Blocks IPs for 30 minutes after exceeding rate limit
 */
@Injectable()
export class EnhancedThrottlerGuard extends ThrottlerGuard {
    constructor(private readonly throttlerStorage: ThrottlerStorageService) {
        super({
            throttlers: [],
            errorMessage: 'Too many requests',
            ignoreUserAgents: [],
            skipIf: () => false,
            getTracker: () => Promise.resolve(''),
            generateKey: () => '',
        }, null as any, null as any);
    }

    /**
     * Extract real client IP from request
     * Handles proxy scenarios (Nginx, Cloudflare, etc.)
     */
    protected async getTracker(req: Request): Promise<string> {
        // Priority order for IP extraction:
        // 1. X-Forwarded-For (most common with proxies)
        // 2. X-Real-IP (Nginx)
        // 3. CF-Connecting-IP (Cloudflare)
        // 4. req.ip (direct connection)

        const forwardedFor = req.headers['x-forwarded-for'];
        if (forwardedFor) {
            const ips = Array.isArray(forwardedFor)
                ? forwardedFor[0]
                : forwardedFor.split(',')[0];
            return ips.trim();
        }

        const realIp = req.headers['x-real-ip'];
        if (realIp) {
            return Array.isArray(realIp) ? realIp[0] : realIp;
        }

        const cfConnectingIp = req.headers['cf-connecting-ip'];
        if (cfConnectingIp) {
            return Array.isArray(cfConnectingIp) ? cfConnectingIp[0] : cfConnectingIp;
        }

        return req.ip || 'unknown';
    }

    /**
     * Handle rate limiting logic
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const ip = await this.getTracker(request);

        // Check if IP is already blocked
        const isBlocked = await this.throttlerStorage.isBlocked(ip);
        if (isBlocked) {
            const timeRemaining = await this.throttlerStorage.getBlockTimeRemaining(ip);
            throw new ThrottlerException(
                `Your IP (${ip}) has been blocked for ${Math.ceil(timeRemaining / 60)} more minutes due to excessive requests.`
            );
        }

        // Increment request count
        const { totalHits, timeToExpire } = await this.throttlerStorage.increment(ip, 60); // 60 seconds TTL

        // Check if limit exceeded (10 requests per minute)
        if (totalHits > 10) {
            // Block the IP for 30 minutes
            await this.throttlerStorage.blockIp(ip);

            throw new ThrottlerException(
                `Rate limit exceeded. Your IP (${ip}) has been blocked for 30 minutes.`
            );
        }

        // Add rate limit headers
        const response = context.switchToHttp().getResponse();
        response.header('X-RateLimit-Limit', '10');
        response.header('X-RateLimit-Remaining', String(Math.max(0, 10 - totalHits)));
        response.header('X-RateLimit-Reset', String(Date.now() + timeToExpire * 1000));

        return true;
    }
}
