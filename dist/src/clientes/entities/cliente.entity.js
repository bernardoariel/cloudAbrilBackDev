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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
let Cliente = class Cliente {
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'CodCliente', type: 'varchar', length: 7 }),
    __metadata("design:type", String)
], Cliente.prototype, "codCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CodSucursal', type: 'int' }),
    __metadata("design:type", Number)
], Cliente.prototype, "codSucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Nombre', type: 'nvarchar', length: 60 }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NroDoc', type: 'int' }),
    __metadata("design:type", Number)
], Cliente.prototype, "nroDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Cuit', type: 'nvarchar', length: 13 }),
    __metadata("design:type", String)
], Cliente.prototype, "cuit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Prefijo', type: 'nvarchar', length: 5, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "prefijo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Telefonos', type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefonos", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('Clientes_Per')
], Cliente);
//# sourceMappingURL=cliente.entity.js.map