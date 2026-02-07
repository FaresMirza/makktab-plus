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
exports.OfficesController = void 0;
const common_1 = require("@nestjs/common");
const offices_service_1 = require("./offices.service");
const create_office_dto_1 = require("./dto/create-office.dto");
const update_office_dto_1 = require("./dto/update-office.dto");
const client_1 = require("../../../prisma/src/generated/prisma-client/client");
let OfficesController = class OfficesController {
    officesService;
    constructor(officesService) {
        this.officesService = officesService;
    }
    create(createOfficeDto) {
        return this.officesService.create(createOfficeDto);
    }
    findAll(status) {
        if (status) {
            return this.officesService.findByStatus(status);
        }
        return this.officesService.findAll();
    }
    findByOwner(ownerUserId) {
        return this.officesService.findByOwner(ownerUserId);
    }
    getStatistics(id) {
        return this.officesService.getStatistics(id);
    }
    findOne(id) {
        return this.officesService.findOne(id);
    }
    update(id, updateOfficeDto) {
        return this.officesService.update(id, updateOfficeDto);
    }
    remove(id) {
        return this.officesService.remove(id, false);
    }
    removePermanent(id) {
        return this.officesService.remove(id, true);
    }
};
exports.OfficesController = OfficesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_office_dto_1.CreateOfficeDto]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('owner/:ownerUserId'),
    __param(0, (0, common_1.Param)('ownerUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "findByOwner", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_office_dto_1.UpdateOfficeDto]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/permanent'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OfficesController.prototype, "removePermanent", null);
exports.OfficesController = OfficesController = __decorate([
    (0, common_1.Controller)('offices'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    })),
    __metadata("design:paramtypes", [offices_service_1.OfficesService])
], OfficesController);
//# sourceMappingURL=offices.controller.js.map