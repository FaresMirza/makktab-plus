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
exports.CreateOtpCodeDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/src/generated/prisma-client/client");
const swagger_1 = require("@nestjs/swagger");
class CreateOtpCodeDto {
    userId;
    officeId;
    purpose;
    channel;
    code;
    attempts;
    deviceFingerprint;
    ip;
    userAgent;
    emailSnapshot;
    phoneSnapshot;
}
exports.CreateOtpCodeDto = CreateOtpCodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the user requesting the OTP', example: 'user-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The ID of the office', example: 'office-uuid-123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "officeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The purpose of the OTP',
        example: 'LOGIN',
        enum: client_1.OtpPurpose
    }),
    (0, class_validator_1.IsEnum)(client_1.OtpPurpose),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "purpose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The channel for OTP delivery',
        example: 'EMAIL',
        enum: client_1.OtpChannel
    }),
    (0, class_validator_1.IsEnum)(client_1.OtpChannel),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The OTP code (will be hashed)', example: '123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of attempts allowed', example: 3, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOtpCodeDto.prototype, "attempts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device fingerprint for security', example: 'device-hash-123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "deviceFingerprint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IP address of the request', example: '192.168.1.1', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "ip", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User agent string', example: 'Mozilla/5.0...', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "userAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Snapshot of email at time of OTP generation', example: 'user@example.com', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "emailSnapshot", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Snapshot of phone at time of OTP generation', example: '+1234567890', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOtpCodeDto.prototype, "phoneSnapshot", void 0);
//# sourceMappingURL=create-otp-code.dto.js.map