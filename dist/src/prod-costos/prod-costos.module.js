"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdCostosModule = void 0;
const common_1 = require("@nestjs/common");
const prod_costos_service_1 = require("./prod-costos.service");
const prod_costos_controller_1 = require("./prod-costos.controller");
const prod_costo_entity_1 = require("./entities/prod-costo.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ProdCostosModule = class ProdCostosModule {
};
exports.ProdCostosModule = ProdCostosModule;
exports.ProdCostosModule = ProdCostosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prod_costo_entity_1.ProdCostos], 'sqlserverConnection')],
        controllers: [prod_costos_controller_1.ProdCostosController],
        providers: [prod_costos_service_1.ProdCostosService],
        exports: [prod_costos_service_1.ProdCostosService],
    })
], ProdCostosModule);
//# sourceMappingURL=prod-costos.module.js.map