# Authentication API - Complete Guide

## Overview
This authentication system uses **OTP (One-Time Password)** verification for both login and password reset flows.

---

## 🔐 Login Flow (2 Steps)

### Step 1: Validate Credentials and Send OTP
**Endpoint:** `POST /auth/login`

Validates username and password, then sends OTP to user's email.

**Request:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Credentials verified. Login OTP has been sent to your email",
  "otp": "123456",  // Only in development
  "email": "john@example.com"
}
```

**What happens:**
- ✅ Validates username exists
- ✅ Checks for account lockout (5 failed attempts = 15 min lockout)
- ✅ Verifies password
- ✅ Records failed login attempt if password is wrong
- ✅ Generates and sends OTP if password is correct
- ✅ OTP expires in 10 minutes

---

### Step 2: Verify OTP and Complete Login
**Endpoint:** `POST /auth/verify-login-otp`

Verifies the OTP and completes the login process.

**Request:**
```json
{
  "email": "john@example.com",
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
    "email": "john@example.com",
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
- ✅ Validates user exists
- ✅ Verifies OTP (max 3 attempts)
- ✅ Marks OTP as used
- ✅ Records successful login attempt
- ✅ Returns user data (password excluded)

---

## 🔑 Password Reset Flow (3 Steps)

### Step 1: Request Password Reset OTP
**Endpoint:** `POST /auth/forgot-password`

Sends OTP to user's email for password reset.

**Request:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset OTP has been sent to your email",
  "otp": "123456",  // Only in development
  "email": "john@example.com"
}
```

**What happens:**
- ✅ Validates user exists
- ✅ Generates 6-digit OTP
- ✅ Stores hashed OTP in database
- ✅ OTP expires in 10 minutes
- ✅ TODO: Sends OTP via email service

---

### Step 2: Verify Reset Password OTP
**Endpoint:** `POST /auth/verify-reset-password-otp`

Verifies the OTP before allowing password reset.

**Request:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "OTP verified successfully. You can now reset your password.",
  "email": "john@example.com"
}
```

**What happens:**
- ✅ Validates user exists
- ✅ Verifies OTP (max 3 attempts)
- ✅ Marks OTP as used
- ✅ Allows user to proceed to password reset

---

### Step 3: Reset Password
**Endpoint:** `POST /auth/reset-password`

Resets the user's password (after OTP verification).

**Request:**
```json
{
  "email": "john@example.com",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "message": "Password has been reset successfully"
}
```

**What happens:**
- ✅ Validates user exists
- ✅ Hashes new password with bcrypt
- ✅ Updates password in database
- ✅ User can now login with new password

---

## 🔍 Generic OTP Verification
**Endpoint:** `POST /auth/verify-otp`

Generic endpoint for verifying OTP for various purposes.

**Request:**
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
    ...
  }
}
```

**OTP Purposes:**
- `LOGIN` - Login verification
- `RESET_PASSWORD` - Password reset verification
- `FIRST_LOGIN` - First time login verification
- `CHANGE_DETAILS` - Account details change verification

---

## 🧪 Testing Examples

### Login Flow
```bash
# Step 1: Validate credentials and send OTP
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123"}'

# Step 2: Verify OTP and complete login
curl -X POST http://localhost:3000/auth/verify-login-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456"}'
```

### Password Reset Flow
```bash
# Step 1: Request password reset OTP
curl -X POST http://localhost:3000/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'

# Step 2: Verify reset password OTP
curl -X POST http://localhost:3000/auth/verify-reset-password-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456"}'

# Step 3: Reset password
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","newPassword":"newPassword123"}'
```

---

## 🔒 Security Features

| Feature | Description |
|---------|-------------|
| **Password Hashing** | bcrypt with 10 salt rounds |
| **OTP Hashing** | All OTPs hashed before storage |
| **OTP Expiry** | 10 minutes |
| **OTP Attempts** | Max 3 verification attempts per OTP |
| **Account Lockout** | 5 failed login attempts = 15 min lockout |
| **Login Tracking** | IP, user agent, device fingerprint logged |
| **Secure Response** | Password hash never returned |

---

## ❌ Error Handling

| Error | Status | Message |
|-------|--------|---------|
| User not found | 404 | `User with email/username X not found` |
| Invalid credentials | 401 | `Invalid credentials` |
| Invalid OTP | 400 | `Invalid OTP code` |
| Expired OTP | 400 | `Invalid or expired OTP code` |
| Max OTP attempts | 400 | `Maximum OTP verification attempts exceeded. Please request a new code.` |
| Account locked | 401 | `Account temporarily locked due to too many failed login attempts. Please try again in 15 minutes.` |
| No office | 400 | `User is not associated with any office` |

---

## 📊 API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | Step 1: Validate credentials, send login OTP |
| `/auth/verify-login-otp` | POST | Step 2: Verify OTP, complete login |
| `/auth/forgot-password` | POST | Step 1: Send password reset OTP |
| `/auth/verify-reset-password-otp` | POST | Step 2: Verify reset password OTP |
| `/auth/reset-password` | POST | Step 3: Reset password |
| `/auth/verify-otp` | POST | Generic OTP verification |

---

## 🚀 Next Steps

### 1. Integrate OTP Email Service
Replace TODO comments in `auth.service.ts`:

```typescript
// Current (development)
return {
  message: 'Login OTP has been sent to your email',
  otp: otpCode,  // Remove in production
  email: user.email,
};

// Production
await this.otpService.sendEmail(user.email, otpCode, OtpPurpose.LOGIN);
return {
  message: 'Login OTP has been sent to your email',
};
```

### 2. Add JWT Tokens
Generate tokens after successful login:

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

### 3. Add Authentication Guards
Protect routes:

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

### 4. Add Rate Limiting
Prevent abuse:

```typescript
@UseGuards(ThrottlerGuard)
@Throttle(5, 60) // 5 requests per 60 seconds
@Post('login')
async login(...) { }
```

---

## 📁 File Structure

```
auth/
├── auth.controller.ts                    # HTTP endpoints
├── auth.service.ts                       # Business logic
├── auth.module.ts                        # Module configuration
├── dto/
│   ├── login.dto.ts                      # Login credentials
│   ├── verify-login-otp.dto.ts           # Login OTP verification
│   ├── forgot-password.dto.ts            # Password reset request
│   ├── verify-reset-password-otp.dto.ts  # Reset password OTP verification
│   ├── reset-password.dto.ts             # New password
│   └── verify-otp.dto.ts                 # Generic OTP verification
├── helpers/
│   └── auth.helper.ts                    # Validation & utilities
└── queries/
    └── auth.queries.ts                   # Database operations
```

---

## 🗄️ Database Schema

### OtpCode
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
}
```

### LoginAttempt
```prisma
model LoginAttempt {
  id                String      @id @default(uuid())
  userId            String
  officeId          String
  success           Boolean
  method            LoginMethod  // OTP, PASSWORD
  ip                String?
  userAgent         String?
  failReason        String?
  createdAt         DateTime    @default(now())
}
```
