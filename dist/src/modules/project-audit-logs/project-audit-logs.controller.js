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
exports.ProjectAuditLogsController = void 0;
const common_1 = require("@nestjs/common");
const project_audit_logs_service_1 = require("./project-audit-logs.service");
const create_project_audit_log_dto_1 = require("./dto/create-project-audit-log.dto");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let ProjectAuditLogsController = class ProjectAuditLogsController {
    projectAuditLogsService;
    constructor(projectAuditLogsService) {
        this.projectAuditLogsService = projectAuditLogsService;
    }
    create(createProjectAuditLogDto) {
        return this.projectAuditLogsService.create(createProjectAuditLogDto);
    }
    findAll(projectId, officeId, actorUserId, action) {
        if (projectId) {
            return this.projectAuditLogsService.findByProject(projectId);
        }
        if (officeId) {
            return this.projectAuditLogsService.findByOffice(officeId);
        }
        if (actorUserId) {
            return this.projectAuditLogsService.findByActor(actorUserId);
        }
        if (action) {
            return this.projectAuditLogsService.findByAction(action);
        }
        return this.projectAuditLogsService.findAll();
    }
    findOne(id) {
        return this.projectAuditLogsService.findOne(id);
    }
    remove(id) {
        return this.projectAuditLogsService.remove(id);
    }
};
exports.ProjectAuditLogsController = ProjectAuditLogsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_audit_log_dto_1.CreateProjectAuditLogDto]),
    __metadata("design:returntype", void 0)
], ProjectAuditLogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('projectId')),
    __param(1, (0, common_1.Query)('officeId')),
    __param(2, (0, common_1.Query)('actorUserId')),
    __param(3, (0, common_1.Query)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ProjectAuditLogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectAuditLogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectAuditLogsController.prototype, "remove", null);
exports.ProjectAuditLogsController = ProjectAuditLogsController = __decorate([
    (0, common_1.Controller)('project-audit-logs'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })),
    __metadata("design:paramtypes", [project_audit_logs_service_1.ProjectAuditLogsService])
], ProjectAuditLogsController);
//# sourceMappingURL=project-audit-logs.controller.js.map