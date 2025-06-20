"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdSucursalModule = void 0;
const common_1 = require("@nestjs/common");
const prod_sucursal_service_1 = require("./prod-sucursal.service");
const prod_sucursal_controller_1 = require("./prod-sucursal.controller");
const typeorm_1 = require("@nestjs/typeorm");
const prod_sucursal_entity_1 = require("./entities/prod-sucursal.entity");
let ProdSucursalModule = class ProdSucursalModule {
};
exports.ProdSucursalModule = ProdSucursalModule;
exports.ProdSucursalModule = ProdSucursalModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prod_sucursal_entity_1.Sucursal], 'sqlserverConnection')],
        providers: [prod_sucursal_service_1.ProdSucursalService],
        controllers: [prod_sucursal_controller_1.ProdSucursalController],
        exports: [prod_sucursal_service_1.ProdSucursalService],
    })
], ProdSucursalModule);
//# sourceMappingURL=prod-sucursal.module.js.map