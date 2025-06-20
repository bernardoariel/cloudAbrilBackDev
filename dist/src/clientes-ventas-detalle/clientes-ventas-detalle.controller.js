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
exports.ClientesVentasDetalleController = void 0;
const common_1 = require("@nestjs/common");
const clientes_ventas_detalle_service_1 = require("./clientes-ventas-detalle.service");
const create_clientes_ventas_detalle_dto_1 = require("./dto/create-clientes-ventas-detalle.dto");
const update_clientes_ventas_detalle_dto_1 = require("./dto/update-clientes-ventas-detalle.dto");
let ClientesVentasDetalleController = class ClientesVentasDetalleController {
    constructor(clientesVentasDetalleService) {
        this.clientesVentasDetalleService = clientesVentasDetalleService;
    }
    create(createClientesVentasDetalleDto) {
        return this.clientesVentasDetalleService.create(createClientesVentasDetalleDto);
    }
    findAll() {
        return this.clientesVentasDetalleService.findAll();
    }
    findOne(id) {
        return this.clientesVentasDetalleService.findOne(+id);
    }
    update(id, updateClientesVentasDetalleDto) {
        return this.clientesVentasDetalleService.update(+id, updateClientesVentasDetalleDto);
    }
    remove(id) {
        return this.clientesVentasDetalleService.remove(+id);
    }
};
exports.ClientesVentasDetalleController = ClientesVentasDetalleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clientes_ventas_detalle_dto_1.CreateClientesVentasDetalleDto]),
    __metadata("design:returntype", void 0)
], ClientesVentasDetalleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientesVentasDetalleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientesVentasDetalleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clientes_ventas_detalle_dto_1.UpdateClientesVentasDetalleDto]),
    __metadata("design:returntype", void 0)
], ClientesVentasDetalleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientesVentasDetalleController.prototype, "remove", null);
exports.ClientesVentasDetalleController = ClientesVentasDetalleController = __decorate([
    (0, common_1.Controller)('clientes-ventas-detalle'),
    __metadata("design:paramtypes", [clientes_ventas_detalle_service_1.ClientesVentasDetalleService])
], ClientesVentasDetalleController);
//# sourceMappingURL=clientes-ventas-detalle.controller.js.map