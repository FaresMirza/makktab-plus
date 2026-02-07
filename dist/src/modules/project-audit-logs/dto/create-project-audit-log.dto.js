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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectAuditLogDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/src/generated/prisma-client/client");
const swagger_1 = require("@nestjs/swagger");
class CreateProjectAuditLogDto {
    officeId;
    projectId;
    actorUserId;
    action;
    fieldName;
    oldValue;
    newValue;
    ip;
    deviceFingerprint;
    geo;
}
exports.CreateProjectAuditLogDto = CreateProjectAuditLogDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the office', example: 'office-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "officeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the project', example: 'project-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the user who performed the action', example: 'user-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "actorUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The action performed',
        example: 'UPDATE',
        enum: client_1.ProjectAction
    }),
    (0, class_validator_1.IsEnum)(client_1.ProjectAction),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the field that was changed', example: 'status', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "fieldName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The old value before the change', example: 'IN_PROGRESS', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "oldValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The new value after the change', example: 'COMPLETED', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "newValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address of the request', example: '192.168.1.1', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "deviceFingerprint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geographic location', example: 'New York, US', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectAuditLogDto.prototype, "geo", void 0);
//# sourceMappingURL=create-project-audit-log.dto.js.map