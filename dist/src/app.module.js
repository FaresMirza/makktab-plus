"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const users_module_1 = require("./modules/users/users.module");
const offices_module_1 = require("./modules/offices/offices.module");
const projects_module_1 = require("./modules/projects/projects.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const roles_module_1 = require("./modules/roles/roles.module");
const otp_codes_module_1 = require("./modules/otp-codes/otp-codes.module");
const login_attempts_module_1 = require("./modules/login-attempts/login-attempts.module");
const project_audit_logs_module_1 = require("./modules/project-audit-logs/project-audit-logs.module");
const task_audit_logs_module_1 = require("./modules/task-audit-logs/task-audit-logs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            offices_module_1.OfficesModule,
            projects_module_1.ProjectsModule,
            tasks_module_1.TasksModule,
            roles_module_1.RolesModule,
            otp_codes_module_1.OtpCodesModule,
            login_attempts_module_1.LoginAttemptsModule,
            project_audit_logs_module_1.ProjectAuditLogsModule,
            task_audit_logs_module_1.TaskAuditLogsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map