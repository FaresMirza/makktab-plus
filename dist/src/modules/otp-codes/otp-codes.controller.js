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
exports.OtpCodesController = void 0;
const common_1 = require("@nestjs/common");
const otp_codes_service_1 = require("./otp-codes.service");
const create_otp_code_dto_1 = require("./dto/create-otp-code.dto");
const verify_otp_code_dto_1 = require("./dto/verify-otp-code.dto");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let OtpCodesController = class OtpCodesController {
    otpCodesService;
    constructor(otpCodesService) {
        this.otpCodesService = otpCodesService;
    }
    create(createOtpCodeDto) {
        return this.otpCodesService.create(createOtpCodeDto);
    }
    verify(verifyOtpCodeDto) {
        return this.otpCodesService.verify(verifyOtpCodeDto);
    }
    findAll(userId, purpose) {
        if (userId) {
            return this.otpCodesService.findByUser(userId);
        }
        if (purpose) {
            return this.otpCodesService.findByPurpose(purpose);
        }
        return this.otpCodesService.findAll();
    }
    findExpired() {
        return this.otpCodesService.findExpired();
    }
    findOne(id) {
        return this.otpCodesService.findOne(id);
    }
    remove(id) {
        return this.otpCodesService.remove(id);
    }
};
exports.OtpCodesController = OtpCodesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_otp_code_dto_1.CreateOtpCodeDto]),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_code_dto_1.VerifyOtpCodeDto]),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('purpose')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('expired'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "findExpired", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OtpCodesController.prototype, "remove", null);
exports.OtpCodesController = OtpCodesController = __decorate([
    (0, common_1.Controller)('otp-codes'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })),
    __metadata("design:paramtypes", [otp_codes_service_1.OtpCodesService])
], OtpCodesController);
//# sourceMappingURL=otp-codes.controller.js.map