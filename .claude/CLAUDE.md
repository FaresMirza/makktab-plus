# Makktab Plus

Multi-tenant office management platform for law firms, real estate offices, and consulting companies. Built with NestJS + Prisma + PostgreSQL.

---

## Technology Stack

| Layer            | Tool / Version                        |
|------------------|---------------------------------------|
| Runtime          | Node.js + TypeScript (ES2023)         |
| Framework        | NestJS 11                             |
| ORM              | Prisma 6.19 (PostgreSQL)              |
| Validation       | class-validator + class-transformer   |
| API Docs         | Swagger (@nestjs/swagger 11)          |
| Auth             | bcrypt (password hashing)             |
| Config           | @nestjs/config (dotenv)               |
| Testing          | Jest 30 + Supertest 7                 |
| Linting          | ESLint 9 + Prettier 3                 |
| Containerization | Docker (PostgreSQL 15 dev container)  |

---

## Repository Structure

```
makktab-plus/
├── src/
│   ├── main.ts                    # Bootstrap, Swagger setup, ValidationPipe
│   ├── app.module.ts              # Root module importing all feature modules
│   └── modules/
│       ├── prisma/                # PrismaService (database connection)
│       ├── auth/                  # Authentication
│       ├── users/                 # User management
│       ├── offices/               # Office (tenant) management
│       ├── roles/                 # Role definitions
│       ├── projects/              # Project CRUD
│       ├── tasks/                 # Task CRUD
│       ├── otp-codes/             # OTP code generation/verification
│       ├── login-attempts/        # Login attempt tracking
│       ├── project-audit-logs/    # Project change audit trail
│       └── task-audit-logs/       # Task change audit trail
├── prisma/
│   ├── schema.prisma              # Database schema (all models & enums)
│   ├── migrations/                # Prisma migrations
│   └── src/generated/             # Generated Prisma client
├── Dockerfile                     # PostgreSQL 15 dev container
├── nest-cli.json                  # NestJS CLI config
├── tsconfig.json                  # TypeScript config
└── package.json                   # Scripts and dependencies
```

---

## Modules

### Platform Level
| Module            | Purpose                                    |
|-------------------|--------------------------------------------|
| `offices`         | Create, suspend, reactivate offices        |
| `users`           | Platform-wide user management              |
| `roles`           | Role definitions (platform + office scope) |

### Office Level (multi-tenant, isolated per office)
| Module              | Purpose                              |
|---------------------|--------------------------------------|
| `projects`          | Project CRUD within an office        |
| `tasks`             | Task CRUD within a project           |
| `project-audit-logs`| Audit trail for project changes      |
| `task-audit-logs`   | Audit trail for task changes         |

### Security
| Module            | Purpose                                    |
|-------------------|--------------------------------------------|
| `auth`            | Authentication flows                       |
| `otp-codes`       | OTP generation/verification (SMS, email)   |
| `login-attempts`  | Login attempt tracking and rate limiting   |

### Infrastructure
| Module   | Purpose                     |
|----------|-----------------------------|
| `prisma` | Database connection service |

---

## Database Models

**Core:** `Office`, `User`, `Role`, `Project`, `Task`
**Security:** `OtpCode`, `LoginAttempt`
**Audit:** `ProjectAuditLog`, `TaskAuditLog`

Key enums: `OfficeStatus`, `UserStatus`, `ProjectStatus`, `TaskStatus`, `OtpPurpose`, `OtpChannel`, `LoginMethod`, `ProjectAction`, `TaskAction`

---

## Conventions

### Module Structure
Each module follows: `<name>.module.ts`, `<name>.controller.ts`, `<name>.service.ts`, `dto/`, `entities/`

### Naming
- Modules use kebab-case directories (e.g. `otp-codes/`, `login-attempts/`)
- Files use kebab-case: `<module-name>.<type>.ts`
- Database models use PascalCase in Prisma schema

### Validation
- Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform` enabled
- DTOs use `class-validator` decorators

### API Documentation
- Swagger UI available at `/swagger`
- Controllers use `@nestjs/swagger` decorators

---

## Commands

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run start:dev`  | Start dev server with watch mode   |
| `npm run build`      | Build the project                  |
| `npm run start:prod` | Run production build               |
| `npm run lint`       | Lint and auto-fix                  |
| `npm run format`     | Format code with Prettier          |
| `npm run test`       | Run unit tests                     |
| `npm run test:watch` | Run tests in watch mode            |
| `npm run test:cov`   | Run tests with coverage            |
| `npm run test:e2e`   | Run end-to-end tests               |
| `npm run prisma -- generate`   | Generate Prisma client    |
| `npm run prisma -- migrate dev`| Run database migrations   |
| `npm run prisma -- studio`     | Open Prisma Studio        |

---

## Environment

- Requires `DATABASE_URL` in `.env` (PostgreSQL connection string)
- Default port: `3000` (override with `PORT` env var)
- Prisma client generated to `prisma/src/generated/prisma-client`
