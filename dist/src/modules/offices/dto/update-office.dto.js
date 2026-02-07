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
exports.UpdateOfficeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_office_dto_1 = require("./create-office.dto");
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/src/generated/prisma-client/client");
const swagger_1 = require("@nestjs/swagger");
class UpdateOfficeDto extends (0, mapped_types_1.PartialType)(create_office_dto_1.CreateOfficeDto) {
    name;
    status;
}
exports.UpdateOfficeDto = UpdateOfficeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the office',
        example: 'Headquarters',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOfficeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the office',
        example: 'ACTIVE',
        enum: client_1.OfficeStatus,
        required: false
    }),
    (0, class_validator_1.IsEnum)(client_1.OfficeStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOfficeDto.prototype, "status", void 0);
//# sourceMappingURL=update-office.dto.js.map