import { Injectable } from '@nestjs/common';

interface StorageRecord {
    count: number;
    expiresAt: number;
    blocked?: boolean;
    blockedUntil?: number;
}

/**
 * Custom Throttler Storage with IP blocking capability
 * Blocks IPs for 30 minutes after exceeding rate limit
 */
@Injectable()
export class ThrottlerStorageService {
    private storage = new Map<string, StorageRecord>();
    private readonly BLOCK_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    /**
     * Increment request count for a key (IP address)
     */
    async increment(key: string, ttl: number): Promise<{ totalHits: number; timeToExpire: number; isBlocked: boolean }> {
        const now = Date.now();
        const record = this.storage.get(key);

        // Check if IP is blocked
        if (record?.blocked && record.blockedUntil && record.blockedUntil > now) {
            const timeToExpire = Math.ceil((record.blockedUntil - now) / 1000);
            return {
                totalHits: record.count,
                timeToExpire,
                isBlocked: true,
            };
        }

        // If blocked period expired, unblock
        if (record?.blocked && record.blockedUntil && record.blockedUntil <= now) {
            this.storage.delete(key);
            return this.increment(key, ttl);
        }

        // If no record or expired, create new
        if (!record || record.expiresAt <= now) {
            const expiresAt = now + ttl * 1000;
            this.storage.set(key, {
                count: 1,
                expiresAt,
            });
            return {
                totalHits: 1,
                timeToExpire: ttl,
                isBlocked: false,
            };
        }

        // Increment existing record
        record.count++;
        const timeToExpire = Math.ceil((record.expiresAt - now) / 1000);

        return {
            totalHits: record.count,
            timeToExpire,
            isBlocked: false,
        };
    }

    /**
     * Block an IP address for 30 minutes
     */
    async blockIp(key: string): Promise<void> {
        const now = Date.now();
        const blockedUntil = now + this.BLOCK_DURATION;

        const record = this.storage.get(key);
        if (record) {
            record.blocked = true;
            record.blockedUntil = blockedUntil;
        } else {
            this.storage.set(key, {
                count: 0,
                expiresAt: blockedUntil,
                blocked: true,
                blockedUntil,
            });
        }
    }

    /**
     * Check if IP is blocked
     */
    async isBlocked(key: string): Promise<boolean> {
        const now = Date.now();
        const record = this.storage.get(key);

        if (!record?.blocked || !record.blockedUntil) {
            return false;
        }

        // If block expired, unblock
        if (record.blockedUntil <= now) {
            this.storage.delete(key);
            return false;
        }

        return true;
    }

    /**
     * Get time remaining for block (in seconds)
     */
    async getBlockTimeRemaining(key: string): Promise<number> {
        const now = Date.now();
        const record = this.storage.get(key);

        if (!record?.blocked || !record.blockedUntil) {
            return 0;
        }

        const remaining = Math.ceil((record.blockedUntil - now) / 1000);
        return Math.max(0, remaining);
    }

    /**
     * Clean up expired records periodically
     */
    private cleanupExpired(): void {
        const now = Date.now();
        for (const [key, record] of this.storage.entries()) {
            // Remove if not blocked and expired
            if (!record.blocked && record.expiresAt <= now) {
                this.storage.delete(key);
            }
            // Remove if blocked and block period expired
            if (record.blocked && record.blockedUntil && record.blockedUntil <= now) {
                this.storage.delete(key);
            }
        }
    }

    constructor() {
        // Run cleanup every 5 minutes
        setInterval(() => this.cleanupExpired(), 5 * 60 * 1000);
    }
}
