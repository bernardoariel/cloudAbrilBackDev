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
exports.ClienteVentaDetalle = void 0;
const cliente_venta_entity_1 = require("../../clientes-ventas/entities/cliente-venta.entity");
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("../../productos/entities/producto.entity");
let ClienteVentaDetalle = class ClienteVentaDetalle {
};
exports.ClienteVentaDetalle = ClienteVentaDetalle;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "CodVenta", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "CodProducto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "CodColor", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "Cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "PrecioUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], ClienteVentaDetalle.prototype, "Serie", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1 }),
    __metadata("design:type", String)
], ClienteVentaDetalle.prototype, "Estado", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], ClienteVentaDetalle.prototype, "IVA", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bit', nullable: true }),
    __metadata("design:type", Boolean)
], ClienteVentaDetalle.prototype, "EnService", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bit' }),
    __metadata("design:type", Boolean)
], ClienteVentaDetalle.prototype, "Entrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ClienteVentaDetalle.prototype, "FecEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], ClienteVentaDetalle.prototype, "ProdCombo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_venta_entity_1.ClienteVenta, venta => venta.detalles),
    (0, typeorm_1.JoinColumn)({ name: 'CodVenta', referencedColumnName: 'CodVenta' }),
    __metadata("design:type", cliente_venta_entity_1.ClienteVenta)
], ClienteVentaDetalle.prototype, "venta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto),
    (0, typeorm_1.JoinColumn)({ name: 'CodProducto', referencedColumnName: 'CodProducto' }),
    __metadata("design:type", producto_entity_1.Producto)
], ClienteVentaDetalle.prototype, "producto", void 0);
exports.ClienteVentaDetalle = ClienteVentaDetalle = __decorate([
    (0, typeorm_1.Entity)('Clientes_VenDet')
], ClienteVentaDetalle);
//# sourceMappingURL=clientes-ventas-detalle.entity.js.map