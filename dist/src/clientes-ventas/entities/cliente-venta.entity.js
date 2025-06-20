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
exports.ClienteVenta = void 0;
const clientes_ventas_detalle_entity_1 = require("../../clientes-ventas-detalle/entities/clientes-ventas-detalle.entity");
const cliente_entity_1 = require("../../clientes/entities/cliente.entity");
const typeorm_1 = require("typeorm");
let ClienteVenta = class ClienteVenta {
};
exports.ClienteVenta = ClienteVenta;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ClienteVenta.prototype, "CodVenta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClienteVenta.prototype, "CodSucVenta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClienteVenta.prototype, "CodCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ClienteVenta.prototype, "Fecha", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ClienteVenta.prototype, "Total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClienteVenta.prototype, "FormaPago", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClienteVenta.prototype, "CodVendedor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClienteVenta.prototype, "Estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'CodCliente', referencedColumnName: 'codCliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], ClienteVenta.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clientes_ventas_detalle_entity_1.ClienteVentaDetalle, detalle => detalle.venta),
    __metadata("design:type", Array)
], ClienteVenta.prototype, "detalles", void 0);
exports.ClienteVenta = ClienteVenta = __decorate([
    (0, typeorm_1.Entity)('Clientes_Ventas')
], ClienteVenta);
//# sourceMappingURL=cliente-venta.entity.js.map