"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesVentasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cliente_venta_entity_1 = require("./entities/cliente-venta.entity");
const clientes_ventas_service_1 = require("./clientes-ventas.service");
const clientes_ventas_controller_1 = require("./clientes-ventas.controller");
let ClientesVentasModule = class ClientesVentasModule {
};
exports.ClientesVentasModule = ClientesVentasModule;
exports.ClientesVentasModule = ClientesVentasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cliente_venta_entity_1.ClienteVenta], 'sqlserverConnection')],
        controllers: [clientes_ventas_controller_1.ClientesVentasController],
        providers: [clientes_ventas_service_1.ClientesVentasService],
        exports: [clientes_ventas_service_1.ClientesVentasService]
    })
], ClientesVentasModule);
//# sourceMappingURL=clientes-ventas.module.js.map