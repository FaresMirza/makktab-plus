# OTP-Based Login Flow - Quick Guide

## Overview
The login system now uses **OTP (One-Time Password)** verification instead of traditional password authentication.

## Login Flow (2 Steps)

### Step 1: Request Login OTP
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Login OTP has been sent to your email",
  "otp": "123456",  // Only in development - will be removed in production
  "email": "user@example.com"
}
```

**What happens:**
- ✅ System validates user exists
- ✅ Checks for account lockout (5 failed attempts = 15 min lockout)
- ✅ Generates 6-digit OTP code
- ✅ Hashes and stores OTP in database (expires in 10 minutes)
- ✅ TODO: Sends OTP via email service (currently returns in response for testing)

---

### Step 2: Verify OTP and Complete Login
**Endpoint:** `POST /auth/verify-login-otp`

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "username": "johndoe",
    "roles": ["admin"],
    "status": "ACTIVE",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "offices": [...],
    "ownedOffice": {...}
  }
}
```

**What happens:**
- ✅ System validates user exists
- ✅ Verifies OTP code (max 3 attempts)
- ✅ Marks OTP as used
- ✅ Records successful login attempt with IP and user agent
- ✅ Returns user data (password hash excluded)

---

## Testing with cURL

### Step 1: Request OTP
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

### Step 2: Verify OTP
```bash
curl -X POST http://localhost:3000/auth/verify-login-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456"}'
```

---

## Other Authentication Endpoints

### Forgot Password
**POST** `/auth/forgot-password`
```json
{
  "email": "user@example.com"
}
```

### Reset Password
**POST** `/auth/reset-password`
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newPassword123"
}
```

### Generic OTP Verification
**POST** `/auth/verify-otp`
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "purpose": "LOGIN"  // or "RESET_PASSWORD", "FIRST_LOGIN", "CHANGE_DETAILS"
}
```

---

## Security Features

- 🔒 **OTP Hashing:** All OTP codes are hashed with bcrypt before storage
- ⏱️ **OTP Expiry:** 10 minutes
- 🔢 **Attempt Limiting:** Max 3 OTP verification attempts
- 🚫 **Account Lockout:** 5 failed login attempts = 15 minute lockout
- 📊 **Login Tracking:** All attempts logged with IP, user agent, device fingerprint
- 🔐 **Secure Response:** Password hash never returned in API responses

---

## Error Handling

| Error | Status | Message |
|-------|--------|---------|
| User not found | 404 | `User with email X not found` |
| Invalid OTP | 400 | `Invalid OTP code` |
| Expired OTP | 400 | `Invalid or expired OTP code` |
| Max OTP attempts | 400 | `Maximum OTP verification attempts exceeded. Please request a new code.` |
| Account locked | 401 | `Account temporarily locked due to too many failed login attempts. Please try again in 15 minutes.` |

---

## Next Steps

### 1. Integrate OTP Email Service
Replace the TODO comment in `auth.service.ts`:

```typescript
// Current (development)
return {
  message: 'Login OTP has been sent to your email',
  otp: otpCode,  // Remove this in production
  email: user.email,
};

// Production (with email service)
await this.otpService.sendEmail(user.email, otpCode, OtpPurpose.LOGIN);
return {
  message: 'Login OTP has been sent to your email',
};
```

### 2. Add JWT Tokens
After successful OTP verification, generate JWT tokens:

```typescript
const accessToken = this.jwtService.sign({ userId: user.id });
const refreshToken = this.jwtService.sign({ userId: user.id }, { expiresIn: '7d' });

return {
  message: 'Login successful',
  user: this.authHelper.formatUser(user),
  accessToken,
  refreshToken,
};
```

### 3. Add Guards
Protect routes with authentication guards:

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

---

## Database Schema

### OtpCode Table
```prisma
model OtpCode {
  id                String     @id @default(uuid())
  userId            String
  officeId          String
  purpose           OtpPurpose  // LOGIN, RESET_PASSWORD, etc.
  channel           OtpChannel  // EMAIL, SMS
  codeHash          String      // Hashed OTP
  attempts          Int         // Verification attempts
  expiresAt         DateTime
  usedAt            DateTime?
  createdAt         DateTime   @default(now())
  ...
}
```

### LoginAttempt Table
```prisma
model LoginAttempt {
  id                String      @id @default(uuid())
  userId            String
  officeId          String
  success           Boolean
  method            LoginMethod  // OTP, PASSWORD
  ip                String?
  userAgent         String?
  createdAt         DateTime    @default(now())
  ...
}
```
