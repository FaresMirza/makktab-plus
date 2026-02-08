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
exports.UpdateProjectDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_project_dto_1 = require("./create-project.dto");
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../prisma/src/generated/prisma-client/client");
const swagger_1 = require("@nestjs/swagger");
class UpdateProjectDto extends (0, mapped_types_1.PartialType)(create_project_dto_1.CreateProjectDto) {
    name;
    description;
    projectManagerUserId;
    status;
}
exports.UpdateProjectDto = UpdateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the project',
        example: 'Mobile App Development',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The description of the project',
        example: 'Building a mobile application for iOS and Android',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user who manages this project',
        example: 'user-uuid-456',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "projectManagerUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The status of the project',
        example: 'IN_PROGRESS',
        enum: client_1.ProjectStatus,
        required: false
    }),
    (0, class_validator_1.IsEnum)(client_1.ProjectStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDto.prototype, "status", void 0);
//# sourceMappingURL=update-project.dto.js.map