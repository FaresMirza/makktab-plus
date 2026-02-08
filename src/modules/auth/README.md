# Authentication Module

This module provides comprehensive authentication functionality including login, password reset, and OTP verification.

## Features

- ✅ **Login with username/password**
- ✅ **Forgot password flow with OTP**
- ✅ **Reset password with OTP verification**
- ✅ **Generic OTP verification endpoint**
- ✅ **Login with OTP (alternative to password)**
- ✅ **Account lockout protection** (5 failed attempts = 15 min lockout)
- ✅ **Login attempt tracking** with IP, user agent, and device fingerprint
- ✅ **OTP attempt limiting** (max 3 attempts per OTP)
- ✅ **Secure password hashing** using bcrypt
- ✅ **Secure OTP storage** (hashed in database)

## Architecture

Following the NestJS modular refactoring pattern:

```
auth/
├── auth.controller.ts       # HTTP endpoints
├── auth.service.ts          # Business logic
├── auth.module.ts           # Module configuration
├── dto/                     # Data Transfer Objects
│   ├── login.dto.ts
│   ├── forgot-password.dto.ts
│   ├── reset-password.dto.ts
│   └── verify-otp.dto.ts
├── helpers/                 # Validation & utilities
│   └── auth.helper.ts
└── queries/                 # Database operations
    └── auth.queries.ts
```

## API Endpoints

### 1. Login
**POST** `/auth/login`

Login with username and password.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "roles": ["admin"],
    "status": "ACTIVE",
    "offices": [...],
    "ownedOffice": {...}
  }
}
```

**Security Features:**
- Tracks login attempts with IP and user agent
- Locks account after 5 failed attempts for 15 minutes
- Records all login attempts in database

---

### 2. Forgot Password
**POST** `/auth/forgot-password`

Initiates password reset flow by sending OTP to user's email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset OTP has been sent to your email",
  "otp": "123456",  // Only in development - remove in production
  "email": "john@example.com"
}
```

**Notes:**
- OTP expires in 10 minutes
- OTP is hashed before storage
- Max 3 verification attempts per OTP
- TODO: Integrate with email service to send OTP

---

### 3. Reset Password
**POST** `/auth/reset-password`

Resets password using OTP verification.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully"
}
```

**Security Features:**
- Validates OTP before password change
- Increments OTP attempts on each verification
- Marks OTP as used after successful reset
- Hashes new password with bcrypt

---

### 4. Verify OTP
**POST** `/auth/verify-otp`

Generic OTP verification endpoint for various purposes.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "purpose": "LOGIN"  // or "RESET_PASSWORD", "FIRST_LOGIN", "CHANGE_DETAILS"
}
```

**Response:**
```json
{
  "message": "OTP verified successfully",
  "user": {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

**OTP Purposes:**
- `FIRST_LOGIN` - First time login verification
- `LOGIN` - Regular login with OTP
- `RESET_PASSWORD` - Password reset verification
- `CHANGE_DETAILS` - Account details change verification

---

### 5. Send Login OTP
**POST** `/auth/send-login-otp`

Sends OTP for passwordless login.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Login OTP has been sent to your email",
  "otp": "123456",  // Only in development - remove in production
  "email": "john@example.com"
}
```

**Usage Flow:**
1. User requests login OTP with their email
2. System generates and sends OTP
3. User submits OTP via `/auth/verify-otp` with purpose `LOGIN`
4. System verifies OTP and returns user data

---

## Security Configuration

### Password Requirements
- Minimum 6 characters (configurable in DTOs)
- Hashed with bcrypt (10 salt rounds)

### OTP Configuration
- **Length:** 6 digits
- **Expiry:** 10 minutes
- **Max Attempts:** 3 per OTP
- **Storage:** Hashed with bcrypt

### Account Lockout
- **Trigger:** 5 failed login attempts
- **Duration:** 15 minutes
- **Tracking:** By user ID and timestamp

### Login Tracking
All login attempts are recorded with:
- User ID
- Office ID
- Success/failure status
- Login method (PASSWORD or OTP)
- IP address
- User agent
- Device fingerprint (optional)
- Geo location (optional)
- Failure reason (if failed)

---

## Database Schema

The module uses the following Prisma models:

### User
```prisma
model User {
  id           String     @id @default(uuid())
  fullName     String
  email        String     @unique
  phone        String
  username     String     @unique
  passwordHash String
  roles        String[]
  status       UserStatus
  ...
}
```

### OtpCode
```prisma
model OtpCode {
  id                String     @id @default(uuid())
  userId            String
  officeId          String
  purpose           OtpPurpose
  channel           OtpChannel
  codeHash          String
  attempts          Int
  deviceFingerprint String?
  ip                String?
  userAgent         String?
  emailSnapshot     String?
  phoneSnapshot     String?
  expiresAt         DateTime
  usedAt            DateTime?
  createdAt         DateTime   @default(now())
}
```

### LoginAttempt
```prisma
model LoginAttempt {
  id                String      @id @default(uuid())
  userId            String
  officeId          String
  success           Boolean
  method            LoginMethod
  ip                String?
  userAgent         String?
  deviceFingerprint String?
  geo               String?
  failReason        String?
  createdAt         DateTime    @default(now())
}
```

---

## TODO: OTP Service Integration

Currently, OTP codes are returned in the API response for testing. In production, you should:

1. **Create an OTP Service** (`src/modules/otp/otp.service.ts`)
2. **Integrate Email Provider** (SendGrid, AWS SES, etc.)
3. **Integrate SMS Provider** (Twilio, AWS SNS, etc.)
4. **Update Auth Service** to call OTP service instead of returning OTP

### Example OTP Service Interface:

```typescript
interface OtpService {
  sendEmail(to: string, otp: string, purpose: OtpPurpose): Promise<void>;
  sendSms(to: string, otp: string, purpose: OtpPurpose): Promise<void>;
}
```

### Integration Points:

In `auth.service.ts`, replace:
```typescript
// TODO: Send OTP via email service
return {
  message: 'Password reset OTP has been sent to your email',
  otp: otpCode,  // Remove this in production
};
```

With:
```typescript
await this.otpService.sendEmail(user.email, otpCode, OtpPurpose.RESET_PASSWORD);
return {
  message: 'Password reset OTP has been sent to your email',
};
```

---

## Testing

### Manual Testing with cURL

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123"}'
```

**Forgot Password:**
```bash
curl -X POST http://localhost:3000/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

**Reset Password:**
```bash
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456","newPassword":"newPass123"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456","purpose":"LOGIN"}'
```

---

## Error Handling

The module provides clear error messages:

- **Invalid credentials:** `401 Unauthorized - Invalid credentials`
- **Account locked:** `401 Unauthorized - Account temporarily locked due to too many failed login attempts...`
- **User not found:** `404 Not Found - User with email X not found`
- **Invalid OTP:** `400 Bad Request - Invalid OTP code`
- **Expired OTP:** `400 Bad Request - Invalid or expired OTP code`
- **Max OTP attempts:** `400 Bad Request - Maximum OTP verification attempts exceeded...`
- **No office association:** `400 Bad Request - User is not associated with any office`

---

## Dependencies

- `@nestjs/common` - NestJS core
- `bcrypt` - Password and OTP hashing
- `class-validator` - DTO validation
- `class-transformer` - DTO transformation
- `@prisma/client` - Database ORM

---

## Next Steps

1. **Implement OTP Service** for email/SMS delivery
2. **Add JWT Authentication** for session management
3. **Add Guards** to protect routes
4. **Add Rate Limiting** to prevent abuse
5. **Add 2FA Support** for enhanced security
6. **Add Refresh Tokens** for better UX
7. **Add Password Strength Validation**
8. **Add Email Verification** on signup
9. **Add Social Login** (Google, Facebook, etc.)
