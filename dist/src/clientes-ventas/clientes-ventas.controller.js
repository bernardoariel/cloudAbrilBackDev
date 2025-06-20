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
exports.ClientesVentasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clientes_ventas_service_1 = require("./clientes-ventas.service");
let ClientesVentasController = class ClientesVentasController {
    constructor(clientesVentasService) {
        this.clientesVentasService = clientesVentasService;
    }
    findAll() {
        return this.clientesVentasService.findAll();
    }
    findOne(id) {
        return this.clientesVentasService.findOne(+id);
    }
    async findByFecha(desde, hasta) {
        const fechaDesde = new Date(desde);
        const fechaHasta = new Date(hasta);
        if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
            throw new Error('Invalid date format');
        }
        const diff = Math.abs(fechaHasta.getTime() - fechaDesde.getTime());
        const dias = diff / (1000 * 3600 * 24);
        if (dias > 30) {
            throw new Error('The date range cannot exceed 30 days');
        }
        return this.clientesVentasService.findByFechaConCliente(fechaDesde, fechaHasta);
    }
    async findVentaCompleta(codVenta) {
        return this.clientesVentasService.findVentaCompleta(+codVenta);
    }
};
exports.ClientesVentasController = ClientesVentasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientesVentasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientesVentasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/filtro/fecha'),
    __param(0, (0, common_1.Query)('desde')),
    __param(1, (0, common_1.Query)('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClientesVentasController.prototype, "findByFecha", null);
__decorate([
    (0, common_1.Get)('completa/:codVenta'),
    __param(0, (0, common_1.Param)('codVenta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientesVentasController.prototype, "findVentaCompleta", null);
exports.ClientesVentasController = ClientesVentasController = __decorate([
    (0, swagger_1.ApiTags)('Abril-SqlServer'),
    (0, common_1.Controller)('clientes-ventas'),
    __metadata("design:paramtypes", [clientes_ventas_service_1.ClientesVentasService])
], ClientesVentasController);
//# sourceMappingURL=clientes-ventas.controller.js.map