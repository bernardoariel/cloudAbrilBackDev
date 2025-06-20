"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesVentasDetalleService = void 0;
const common_1 = require("@nestjs/common");
let ClientesVentasDetalleService = class ClientesVentasDetalleService {
    create(createClientesVentasDetalleDto) {
        return 'This action adds a new clientesVentasDetalle';
    }
    findAll() {
        return `This action returns all clientesVentasDetalle`;
    }
    findOne(id) {
        return `This action returns a #${id} clientesVentasDetalle`;
    }
    update(id, updateClientesVentasDetalleDto) {
        return `This action updates a #${id} clientesVentasDetalle`;
    }
    remove(id) {
        return `This action removes a #${id} clientesVentasDetalle`;
    }
};
exports.ClientesVentasDetalleService = ClientesVentasDetalleService;
exports.ClientesVentasDetalleService = ClientesVentasDetalleService = __decorate([
    (0, common_1.Injectable)()
], ClientesVentasDetalleService);
//# sourceMappingURL=clientes-ventas-detalle.service.js.map