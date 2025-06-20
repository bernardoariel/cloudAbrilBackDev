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
exports.FormaPagoPlanes = void 0;
const typeorm_1 = require("typeorm");
let FormaPagoPlanes = class FormaPagoPlanes {
};
exports.FormaPagoPlanes = FormaPagoPlanes;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'nvarchar', length: 3 }),
    __metadata("design:type", String)
], FormaPagoPlanes.prototype, "CodForPago", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], FormaPagoPlanes.prototype, "NCuota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 7, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], FormaPagoPlanes.prototype, "Interes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], FormaPagoPlanes.prototype, "Punitorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 8, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], FormaPagoPlanes.prototype, "Coeficiente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], FormaPagoPlanes.prototype, "Puntos", void 0);
exports.FormaPagoPlanes = FormaPagoPlanes = __decorate([
    (0, typeorm_1.Entity)('FormaPago_Planes')
], FormaPagoPlanes);
//# sourceMappingURL=forma-pago-plane.entity.js.map