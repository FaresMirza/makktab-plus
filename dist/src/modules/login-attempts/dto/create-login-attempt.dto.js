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
exports.CreateLoginAttemptDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/src/generated/prisma-client/client");
const swagger_1 = require("@nestjs/swagger");
class CreateLoginAttemptDto {
    userId;
    officeId;
    success;
    method;
    ip;
    userAgent;
    deviceFingerprint;
    geo;
    failReason;
}
exports.CreateLoginAttemptDto = CreateLoginAttemptDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the user attempting to login', example: 'user-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the office', example: 'office-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "officeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the login attempt was successful', example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateLoginAttemptDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The login method used',
        example: 'PASSWORD',
        enum: client_1.LoginMethod
    }),
    (0, class_validator_1.IsEnum)(client_1.LoginMethod),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address of the request', example: '192.168.1.1', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User agent string', example: 'Mozilla/5.0...', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "deviceFingerprint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Geographic location', example: 'New York, US', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "geo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reason for failure if unsuccessful', example: 'Invalid password', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLoginAttemptDto.prototype, "failReason", void 0);
//# sourceMappingURL=create-login-attempt.dto.js.map