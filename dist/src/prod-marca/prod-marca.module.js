"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdMarcaModule = void 0;
const common_1 = require("@nestjs/common");
const prod_marca_service_1 = require("./prod-marca.service");
const prod_marca_controller_1 = require("./prod-marca.controller");
const typeorm_1 = require("@nestjs/typeorm");
const prod_marca_entity_1 = require("./entities/prod-marca.entity");
const auth_module_1 = require("../auth/auth.module");
let ProdMarcaModule = class ProdMarcaModule {
};
exports.ProdMarcaModule = ProdMarcaModule;
exports.ProdMarcaModule = ProdMarcaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([prod_marca_entity_1.ProdMarca], 'sqlserverConnection'), auth_module_1.AuthModule],
        controllers: [prod_marca_controller_1.ProdMarcaController],
        providers: [prod_marca_service_1.ProdMarcaService],
        exports: [prod_marca_service_1.ProdMarcaService]
    })
], ProdMarcaModule);
//# sourceMappingURL=prod-marca.module.js.map