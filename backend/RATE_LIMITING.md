# Global Rate Limiting with IP Blocking

## Overview
This implementation provides production-ready global rate limiting with IP-based blocking for your NestJS application.

## Features

✅ **Global Rate Limiting**: Applied to all routes automatically  
✅ **IP-Based Tracking**: Tracks requests by real client IP (works behind proxies)  
✅ **Automatic IP Blocking**: Blocks IPs for 30 minutes after exceeding limits  
✅ **Proxy Support**: Extracts real IP from X-Forwarded-For, X-Real-IP, CF-Connecting-IP  
✅ **Rate Limit Headers**: Returns X-RateLimit-* headers in responses  
✅ **Memory Efficient**: Automatic cleanup of expired records  

## Configuration

### Rate Limits
- **Limit**: 10 requests per IP
- **Window**: 1 minute (60 seconds)
- **Block Duration**: 30 minutes on limit exceeded

### Supported Proxies
- Nginx
- Cloudflare
- AWS ALB/ELB
- Any proxy using standard headers

## Implementation

### 1. AppModule Configuration
```typescript
// src/app.module.ts
ThrottlerModule.forRoot([
  {
    ttl: 60000, // 60 seconds in milliseconds
    limit: 10,  // 10 requests per TTL window
  },
]),
```

Global guard applied via `APP_GUARD`:
```typescript
providers: [
  ThrottlerStorageService,
  {
    provide: APP_GUARD,
    useClass: EnhancedThrottlerGuard,
  },
]
```

### 2. Proxy Trust Configuration
```typescript
// src/main.ts
const expressApp = app.getHttpAdapter().getInstance();
expressApp.set('trust proxy', true);
```

**Important**: This allows Express to trust X-Forwarded-* headers from proxies.

### 3. Custom Throttler Guard
```typescript
// src/common/guards/custom-throttler.guard.ts
```

**Features**:
- Extracts real client IP from proxy headers
- Checks if IP is blocked before processing
- Increments request count
- Blocks IP for 30 minutes if limit exceeded
- Adds rate limit headers to response

**IP Extraction Priority**:
1. `X-Forwarded-For` (most common)
2. `X-Real-IP` (Nginx)
3. `CF-Connecting-IP` (Cloudflare)
4. `req.ip` (direct connection)

### 4. Custom Storage Service
```typescript
// src/common/storage/throttler-storage.service.ts
```

**Features**:
- In-memory storage for request counts
- IP blocking for 30 minutes
- Automatic cleanup every 5 minutes
- Tracks block expiration time

## Response Headers

The guard adds the following headers to all responses:

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1707408000000
```

## Error Responses

### Rate Limit Exceeded (First Time)
```json
{
  "statusCode": 429,
  "message": "Rate limit exceeded. Your IP (192.168.1.1) has been blocked for 30 minutes."
}
```

### Blocked IP (Subsequent Requests)
```json
{
  "statusCode": 429,
  "message": "Your IP (192.168.1.1) has been blocked for 25 more minutes due to excessive requests."
}
```

## Testing

### Test Rate Limiting
```bash
# Send 11 requests quickly to trigger rate limit
for i in {1..11}; do
  curl -i http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"test"}'
  echo "Request $i"
done
```

### Test with Proxy Headers
```bash
# Simulate request from behind a proxy
curl -i http://localhost:3000/auth/login \
  -H "X-Forwarded-For: 203.0.113.1" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### Check Rate Limit Headers
```bash
curl -i http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' \
  | grep "X-RateLimit"
```

## Production Deployment

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        
        # Pass real client IP
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
    }
}
```

### Cloudflare
When using Cloudflare, the guard automatically extracts IP from `CF-Connecting-IP` header.

### AWS ALB/ELB
The guard extracts IP from `X-Forwarded-For` header automatically.

## Customization

### Change Rate Limits
Edit `src/app.module.ts`:
```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,  // Change time window (milliseconds)
    limit: 20,   // Change request limit
  },
]),
```

### Change Block Duration
Edit `src/common/storage/throttler-storage.service.ts`:
```typescript
private readonly BLOCK_DURATION = 60 * 60 * 1000; // 60 minutes
```

### Exclude Specific Routes
Use `@SkipThrottle()` decorator:
```typescript
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Get('health')
healthCheck() {
  return { status: 'ok' };
}
```

### Different Limits for Specific Routes
Use `@Throttle()` decorator:
```typescript
import { Throttle } from '@nestjs/throttler';

@Throttle({ default: { limit: 3, ttl: 60000 } })
@Post('login')
login() {
  // This route allows only 3 requests per minute
}
```

## Monitoring

### Log Blocked IPs
Add logging to the guard:
```typescript
if (isBlocked) {
  console.log(`Blocked IP attempt: ${ip} at ${new Date().toISOString()}`);
  throw new ThrottlerException(...);
}
```

### Track Rate Limit Violations
Add logging when blocking:
```typescript
if (totalHits > 10) {
  console.log(`IP ${ip} exceeded rate limit. Blocking for 30 minutes.`);
  await this.throttlerStorage.blockIp(ip);
  throw new ThrottlerException(...);
}
```

## Scaling Considerations

### Current Implementation
- **Storage**: In-memory (single instance)
- **Best for**: Single server deployments

### For Multi-Server Deployments
Consider using Redis for shared storage:

1. Install Redis storage:
```bash
npm install @nestjs/throttler-storage-redis ioredis
```

2. Update AppModule:
```typescript
import { ThrottlerStorageRedisService } from '@nestjs/throttler-storage-redis';

ThrottlerModule.forRoot({
  storage: new ThrottlerStorageRedisService({
    host: 'localhost',
    port: 6379,
  }),
  throttlers: [{ ttl: 60000, limit: 10 }],
}),
```

## Security Best Practices

✅ **Always use `trust proxy`** when behind a reverse proxy  
✅ **Validate proxy headers** in production  
✅ **Monitor for abuse** patterns  
✅ **Adjust limits** based on your API usage  
✅ **Use HTTPS** to prevent header manipulation  
✅ **Log blocked IPs** for security analysis  

## Troubleshooting

### Issue: Rate limiting not working
**Solution**: Ensure `trust proxy` is enabled in `main.ts`

### Issue: Wrong IP being tracked
**Solution**: Check proxy headers are being sent correctly

### Issue: All requests blocked
**Solution**: Check if cleanup is running (every 5 minutes)

### Issue: Rate limits too strict
**Solution**: Adjust `limit` in `app.module.ts`

## Files Structure

```
src/
├── app.module.ts                          # ThrottlerModule configuration
├── main.ts                                # Proxy trust configuration
└── common/
    ├── guards/
    │   └── custom-throttler.guard.ts      # IP extraction & blocking logic
    └── storage/
        └── throttler-storage.service.ts   # In-memory storage with blocking
```

## Dependencies

```json
{
  "@nestjs/throttler": "^5.x.x"
}
```

## Summary

This implementation provides:
- ✅ Global rate limiting (10 req/min per IP)
- ✅ Automatic IP blocking (30 minutes)
- ✅ Proxy support (Nginx, Cloudflare, etc.)
- ✅ Production-ready error messages
- ✅ Rate limit headers
- ✅ Memory efficient cleanup
- ✅ Easy customization

Perfect for production environments with proper proxy support! 🚀
