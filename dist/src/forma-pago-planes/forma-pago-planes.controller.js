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
exports.FormaPagoPlanesController = void 0;
const common_1 = require("@nestjs/common");
const forma_pago_planes_service_1 = require("./forma-pago-planes.service");
const swagger_1 = require("@nestjs/swagger");
let FormaPagoPlanesController = class FormaPagoPlanesController {
    constructor(formaPagoPlanesService) {
        this.formaPagoPlanesService = formaPagoPlanesService;
    }
    async findAll() {
        return await this.formaPagoPlanesService.findAll();
    }
    async findOne(CodForPago) {
        return await this.formaPagoPlanesService.findOne(CodForPago);
    }
};
exports.FormaPagoPlanesController = FormaPagoPlanesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormaPagoPlanesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':CodForPago'),
    __param(0, (0, common_1.Param)('CodForPago')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormaPagoPlanesController.prototype, "findOne", null);
exports.FormaPagoPlanesController = FormaPagoPlanesController = __decorate([
    (0, swagger_1.ApiTags)('FormaPago-Planes'),
    (0, common_1.Controller)('forma-pago-planes'),
    __metadata("design:paramtypes", [forma_pago_planes_service_1.FormaPagoPlanesService])
], FormaPagoPlanesController);
//# sourceMappingURL=forma-pago-planes.controller.js.map