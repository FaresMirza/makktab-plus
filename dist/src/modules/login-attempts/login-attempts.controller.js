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
exports.LoginAttemptsController = void 0;
const common_1 = require("@nestjs/common");
const login_attempts_service_1 = require("./login-attempts.service");
const create_login_attempt_dto_1 = require("./dto/create-login-attempt.dto");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let LoginAttemptsController = class LoginAttemptsController {
    loginAttemptsService;
    constructor(loginAttemptsService) {
        this.loginAttemptsService = loginAttemptsService;
    }
    create(createLoginAttemptDto) {
        return this.loginAttemptsService.create(createLoginAttemptDto);
    }
    findAll(userId, officeId, method) {
        if (userId) {
            return this.loginAttemptsService.findByUser(userId);
        }
        if (officeId) {
            return this.loginAttemptsService.findByOffice(officeId);
        }
        if (method) {
            return this.loginAttemptsService.findByMethod(method);
        }
        return this.loginAttemptsService.findAll();
    }
    findFailed() {
        return this.loginAttemptsService.findFailed();
    }
    findSuccessful() {
        return this.loginAttemptsService.findSuccessful();
    }
    getUserStatistics(userId) {
        return this.loginAttemptsService.getUserStatistics(userId);
    }
    findOne(id) {
        return this.loginAttemptsService.findOne(id);
    }
    remove(id) {
        return this.loginAttemptsService.remove(id);
    }
};
exports.LoginAttemptsController = LoginAttemptsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_login_attempt_dto_1.CreateLoginAttemptDto]),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('officeId')),
    __param(2, (0, common_1.Query)('method')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "findFailed", null);
__decorate([
    (0, common_1.Get)('successful'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "findSuccessful", null);
__decorate([
    (0, common_1.Get)('statistics/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "getUserStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginAttemptsController.prototype, "remove", null);
exports.LoginAttemptsController = LoginAttemptsController = __decorate([
    (0, common_1.Controller)('login-attempts'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })),
    __metadata("design:paramtypes", [login_attempts_service_1.LoginAttemptsService])
], LoginAttemptsController);
//# sourceMappingURL=login-attempts.controller.js.map