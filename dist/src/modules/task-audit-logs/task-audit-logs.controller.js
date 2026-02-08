"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const task_audit_logs_service_1 = require("./task-audit-logs.service");
const create_task_audit_log_dto_1 = require("./dto/create-task-audit-log.dto");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let TaskAuditLogsController = class TaskAuditLogsController {
    taskAuditLogsService;
    constructor(taskAuditLogsService) {
        this.taskAuditLogsService = taskAuditLogsService;
    }
    create(createTaskAuditLogDto) {
        return this.taskAuditLogsService.create(createTaskAuditLogDto);
    }
    findAll(taskId, officeId, actorUserId, action) {
        if (taskId) {
            return this.taskAuditLogsService.findByTask(taskId);
        }
        if (officeId) {
            return this.taskAuditLogsService.findByOffice(officeId);
        }
        if (actorUserId) {
            return this.taskAuditLogsService.findByActor(actorUserId);
        }
        if (action) {
            return this.taskAuditLogsService.findByAction(action);
        }
        return this.taskAuditLogsService.findAll();
    }
    findOne(id) {
        return this.taskAuditLogsService.findOne(id);
    }
    remove(id) {
        return this.taskAuditLogsService.remove(id);
    }
};
exports.TaskAuditLogsController = TaskAuditLogsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_audit_log_dto_1.CreateTaskAuditLogDto]),
    __metadata("design:returntype", void 0)
], TaskAuditLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('taskId')),
    __param(1, (0, common_1.Query)('officeId')),
    __param(2, (0, common_1.Query)('actorUserId')),
    __param(3, (0, common_1.Query)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], TaskAuditLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskAuditLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskAuditLogsController.prototype, "remove", null);
exports.TaskAuditLogsController = TaskAuditLogsController = __decorate([
    (0, common_1.Controller)('task-audit-logs'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })),
    __metadata("design:paramtypes", [task_audit_logs_service_1.TaskAuditLogsService])
], TaskAuditLogsController);
//# sourceMappingURL=task-audit-logs.controller.js.map