# Contributing to Makktab Plus

Thank you for your interest in contributing to Makktab Plus! This document provides an overview of the project status, what needs to be implemented, and how to contribute.

## 📋 Project Status

### ✅ Completed Modules

The following modules are fully implemented with CRUD operations, Swagger documentation, and comprehensive error handling:

1. **Users Module** (`/users`)
   - User registration with password hashing
   - Full CRUD operations
   - Filtering by office, role, status
   - Password management
   - Soft and hard delete

2. **Offices Module** (`/offices`)
   - Office management
   - Owner assignment
   - Statistics tracking
   - Status management (ACTIVE/SUSPENDED)

3. **Projects Module** (`/projects`)
   - Project CRUD operations
   - Office and user relationships
   - Task tracking
   - Project statistics
   - Filtering by office, status, project manager

4. **Tasks Module** (`/tasks`)
   - Task CRUD operations
   - Assignment management
   - Due date tracking
   - Overdue task detection
   - Filtering by project, assignee, status

5. **Roles Module** (`/roles`)
   - Role management for RBAC
   - Scope-based organization
   - Unique key validation

6. **OTP Codes Module** (`/otp-codes`)
   - OTP generation with bcrypt hashing
   - Verification with attempt tracking
   - Expiration management (10 minutes)
   - Email/SMS channel support
   - Purpose tracking (LOGIN, FIRST_LOGIN, RESET_PASSWORD, etc.)

7. **Login Attempts Module** (`/login-attempts`)
   - Security monitoring
   - Success/failure tracking
   - Device fingerprinting
   - IP and geolocation tracking
   - User statistics

8. **Project Audit Logs Module** (`/project-audit-logs`)
   - Complete change tracking for projects
   - Field-level audit trail
   - Actor tracking
   - Compliance logging

9. **Task Audit Logs Module** (`/task-audit-logs`)
   - Complete change tracking for tasks
   - Field-level audit trail
   - Actor tracking
   - Compliance logging

10. **Prisma Module**
    - Database service
    - PostgreSQL connection
    - Schema management

11. **Swagger Integration**
    - Basic API documentation
    - @ApiProperty decorators on all DTOs
    - Endpoint descriptions

---

## 🔴 Critical Priority - Must Implement

### 1. Auth Module (JWT Authentication)

**Location:** `src/modules/auth/`

**Status:** Empty files exist but no implementation

**Required Implementation:**

#### DTOs
- `dto/login.dto.ts` - Email/username and password
- `dto/register.dto.ts` - User registration fields
- `dto/refresh-token.dto.ts` - Refresh token handling

#### Service (`auth.service.ts`)
- `register()` - Create new user account
- `login()` - Authenticate user and return JWT tokens
- `validateUser()` - Verify credentials
- `refreshTokens()` - Generate new access/refresh tokens
- `logout()` - Invalidate tokens

#### Controller (`auth.controller.ts`)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

#### Required Packages
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

#### Strategy Files
- `strategies/jwt.strategy.ts` - JWT validation strategy
- `strategies/local.strategy.ts` - Username/password strategy (optional)

---

### 2. Authentication Guards & Decorators

**Location:** `src/common/guards/` and `src/common/decorators/`

**Required Implementation:**

#### Guards
- `guards/jwt-auth.guard.ts` - Protect routes with JWT
- `guards/roles.guard.ts` - Role-based access control
- `guards/permissions.guard.ts` - Permission-based access (optional)

#### Decorators
- `decorators/public.decorator.ts` - Mark routes as public
- `decorators/current-user.decorator.ts` - Get authenticated user
- `decorators/roles.decorator.ts` - Require specific roles

#### Usage Example
```typescript
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  @Public()
  @Get('public')
  getPublicProjects() {}

  @Roles('admin', 'project-manager')
  @Post()
  create(@CurrentUser() user: User) {}
}
```

---

## 🟡 High Priority - Strongly Recommended

### 3. Swagger Improvements

**Location:** `src/main.ts`

**Improvements Needed:**
- Add Bearer token authentication
- Better API title and description
- Add security schemes
- Group endpoints with better tags
- Add response examples
- Add authentication requirements to protected endpoints

**Example Configuration:**
```typescript
const config = new DocumentBuilder()
  .setTitle('Makktab Plus API')
  .setDescription('Task management system API documentation')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth',
  )
  .build();
```

---

### 4. Global Error Handling

**Location:** `src/common/filters/`

**Required Implementation:**
- `filters/http-exception.filter.ts` - Global exception filter
- `filters/prisma-exception.filter.ts` - Prisma-specific errors
- Standardized error response format

**Error Response Format:**
```json
{
  "statusCode": 400,
  "timestamp": "2026-02-07T10:00:00.000Z",
  "path": "/api/users",
  "message": "Validation failed",
  "errors": []
}
```

---

### 5. Middleware & Interceptors

**Location:** `src/common/middleware/` and `src/common/interceptors/`

**Recommended Implementation:**
- `middleware/logger.middleware.ts` - Request/response logging
- `interceptors/transform.interceptor.ts` - Response transformation
- `interceptors/timeout.interceptor.ts` - Request timeout handling

---

## 🟢 Medium Priority - Nice to Have

### 6. Email Service

**Location:** `src/modules/email/`

**Purpose:** Send OTP codes via email, password reset links, notifications

**Suggested Packages:**
- `@nestjs-modules/mailer`
- `nodemailer`

---

### 7. SMS Service

**Location:** `src/modules/sms/`

**Purpose:** Send OTP codes via SMS

**Suggested Providers:**
- Twilio
- AWS SNS
- Firebase Cloud Messaging

---

### 8. Pagination

**Location:** `src/common/dto/` and `src/common/decorators/`

**Implementation:**
- `dto/pagination.dto.ts` - Page, limit, sort parameters
- `decorators/paginate.decorator.ts` - Pagination decorator
- Apply to all list endpoints

---

### 9. Advanced Search & Filtering

**Enhancements:**
- Full-text search across entities
- Complex filtering with operators
- Sorting by multiple fields
- Date range filters

---

### 10. File Upload Service

**Location:** `src/modules/file-upload/`

**Features:**
- Profile picture upload
- Project/task attachments
- File validation (size, type)
- Cloud storage integration (S3, etc.)

---

### 11. Rate Limiting

**Location:** `src/common/guards/`

**Implementation:**
- `@nestjs/throttler` package
- Protect against brute force attacks
- Configurable limits per endpoint

---

## 🟣 Low Priority - Future Enhancements

### 12. Testing

**Required:**
- Unit tests for services
- Integration tests for controllers
- E2E tests for critical flows
- Test coverage > 80%

---

### 13. Documentation

**Required Files:**
- `README.md` - Setup instructions and project overview
- `API.md` - Detailed API documentation
- `ARCHITECTURE.md` - System design and architecture
- `.env.example` - Environment variables template

---

### 14. DevOps & CI/CD

**Enhancements:**
- Docker configuration
- Docker Compose for development
- GitHub Actions for CI/CD
- Automated testing pipeline
- Deployment scripts

---

### 15. Performance Optimization

**Features:**
- Caching with Redis
- Query optimization
- Database indexing
- Connection pooling

---

## 🛠️ Development Setup

### Prerequisites
- Node.js >= 18
- PostgreSQL
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

### Database Commands
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## 📝 Code Standards

### File Structure
- DTOs in `dto/` folder
- Entities in `entities/` folder
- One service per module
- One controller per module
- Export services in module for reusability

### Naming Conventions
- PascalCase for classes
- camelCase for functions and variables
- kebab-case for file names
- Descriptive names for functions

### Documentation
- JSDoc comments for all public methods
- Explain complex logic
- Document parameters and return types

### Validation
- Use class-validator decorators
- Add @ApiProperty for Swagger documentation
- Provide example values

---

## 🤝 How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/auth-module
   ```
3. **Follow the existing code style**
   - Review existing modules (Users, Offices, etc.)
   - Match the structure and patterns
4. **Write clean, documented code**
5. **Test your changes**
6. **Commit with clear messages**
   ```bash
   git commit -m "feat: implement JWT authentication"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/auth-module
   ```
8. **Create a Pull Request**
   - Describe what you implemented
   - Reference any related issues
   - Include screenshots if applicable

---

## 🎯 Good First Issues

If you're new to the project, consider starting with:
- Swagger improvements
- Adding pagination to existing endpoints
- Writing unit tests for services
- Improving error messages
- Adding JSDoc comments
- Creating README documentation

---

## 📧 Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Check existing documentation
- Review similar implementations in completed modules

---

## 📄 License

This project is licensed under UNLICENSED - see the LICENSE file for details.
