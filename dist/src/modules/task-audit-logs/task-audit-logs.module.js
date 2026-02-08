"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAuditLogsModule = void 0;
const common_1 = require("@nestjs/common");
const task_audit_logs_service_1 = require("./task-audit-logs.service");
const task_audit_logs_controller_1 = require("./task-audit-logs.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let TaskAuditLogsModule = class TaskAuditLogsModule {
};
exports.TaskAuditLogsModule = TaskAuditLogsModule;
exports.TaskAuditLogsModule = TaskAuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [task_audit_logs_controller_1.TaskAuditLogsController],
        providers: [task_audit_logs_service_1.TaskAuditLogsService],
        exports: [task_audit_logs_service_1.TaskAuditLogsService],
    })
], TaskAuditLogsModule);
//# sourceMappingURL=task-audit-logs.module.js.map