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
exports.FormaPagoController = void 0;
const common_1 = require("@nestjs/common");
const forma_pago_service_1 = require("./forma-pago.service");
const swagger_1 = require("@nestjs/swagger");
let FormaPagoController = class FormaPagoController {
    constructor(formaPagoService) {
        this.formaPagoService = formaPagoService;
    }
    async findAll() {
        return await this.formaPagoService.findAll();
    }
};
exports.FormaPagoController = FormaPagoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormaPagoController.prototype, "findAll", null);
exports.FormaPagoController = FormaPagoController = __decorate([
    (0, swagger_1.ApiTags)('FormaPago'),
    (0, common_1.Controller)('forma-pago'),
    __metadata("design:paramtypes", [forma_pago_service_1.FormaPagoService])
], FormaPagoController);
//# sourceMappingURL=forma-pago.controller.js.map