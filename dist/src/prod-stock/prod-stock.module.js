"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdStockModule = void 0;
const common_1 = require("@nestjs/common");
const prod_stock_service_1 = require("./prod-stock.service");
const prod_stock_controller_1 = require("./prod-stock.controller");
const prod_stock_entity_1 = require("./entities/prod-stock.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ProdStockModule = class ProdStockModule {
};
exports.ProdStockModule = ProdStockModule;
exports.ProdStockModule = ProdStockModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([prod_stock_entity_1.ProdStock], 'sqlserverConnection'),
        ],
        controllers: [prod_stock_controller_1.ProdStockController],
        providers: [prod_stock_service_1.ProdStockService],
        exports: [prod_stock_service_1.ProdStockService],
    })
], ProdStockModule);
//# sourceMappingURL=prod-stock.module.js.map