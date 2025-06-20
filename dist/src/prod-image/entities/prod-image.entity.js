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
exports.ProdImage = void 0;
const typeorm_1 = require("typeorm");
let ProdImage = class ProdImage {
};
exports.ProdImage = ProdImage;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', name: 'CodProducto' }),
    __metadata("design:type", String)
], ProdImage.prototype, "CodProducto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProdImage.prototype, "URL", void 0);
exports.ProdImage = ProdImage = __decorate([
    (0, typeorm_1.Entity)('Prod_Imagenes')
], ProdImage);
//# sourceMappingURL=prod-image.entity.js.map