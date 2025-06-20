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
exports.ProdStockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const prod_stock_entity_1 = require("./entities/prod-stock.entity");
const typeorm_2 = require("typeorm");
let ProdStockService = class ProdStockService {
    constructor(prodStockRepository) {
        this.prodStockRepository = prodStockRepository;
        this.stockCache = [];
    }
    async loadStockCache() {
        this.stockCache = await this.prodStockRepository
            .createQueryBuilder('prodStock')
            .select('prodStock.CodProducto', 'CodProducto')
            .addSelect('SUM(prodStock.Cantidad)', 'totalCantidad')
            .where('prodStock.Cantidad != :cantidad', { cantidad: 0 })
            .groupBy('prodStock.CodProducto')
            .getRawMany();
    }
    getStockFromCache(codProducto) {
        return this.stockCache.find((item) => item.CodProducto === codProducto);
    }
    getAllStockFromCache() {
        return this.stockCache;
    }
    async findByCodProductoWithStock(codProducto) {
        const results = await this.prodStockRepository
            .createQueryBuilder('prodStock')
            .where('prodStock.CodProducto = :codProducto', { codProducto })
            .andWhere('prodStock.Cantidad > 0')
            .getMany();
        return results;
    }
};
exports.ProdStockService = ProdStockService;
exports.ProdStockService = ProdStockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prod_stock_entity_1.ProdStock, 'sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProdStockService);
//# sourceMappingURL=prod-stock.service.js.map