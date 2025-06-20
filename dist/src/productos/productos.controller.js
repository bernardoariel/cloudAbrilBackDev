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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const productos_service_1 = require("./productos.service");
const swagger_1 = require("@nestjs/swagger");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    async findAll() {
        const result = await this.productosService.findAllProducts();
        if (!result || result.length === 0) {
            throw new common_1.NotFoundException('No se encontraron productos');
        }
        return {
            total: result.length,
            result,
        };
    }
    async findOne(term) {
        const result = await this.productosService.findProductWithPrice(term);
        if (!result) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (!Array.isArray(result)) {
            return result;
        }
        return result;
    }
    async findProductsByMarca(term, marcas) {
        let result;
        if (marcas === 'marcas' || marcas === 'true') {
            result = await this.productosService.findProductsByMarca(term);
        }
        else {
            result = await this.productosService.findProductWithPrice(term);
        }
        if (!result || result.length === 0) {
            throw new common_1.NotFoundException('No se encontraron productos');
        }
        return result;
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':term'),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':term/:marcas'),
    __param(0, (0, common_1.Param)('term')),
    __param(1, (0, common_1.Param)('marcas')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "findProductsByMarca", null);
exports.ProductosController = ProductosController = __decorate([
    (0, swagger_1.ApiTags)('Abril-SqlServer'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map