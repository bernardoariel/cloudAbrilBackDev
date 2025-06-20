"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesMailingModelModule = void 0;
const common_1 = require("@nestjs/common");
const clientes_mailing_model_service_1 = require("./clientes-mailing-model.service");
const clientes_mailing_model_controller_1 = require("./clientes-mailing-model.controller");
const typeorm_1 = require("@nestjs/typeorm");
const clientes_mailing_model_entity_1 = require("./entities/clientes-mailing-model.entity");
let ClientesMailingModelModule = class ClientesMailingModelModule {
};
exports.ClientesMailingModelModule = ClientesMailingModelModule;
exports.ClientesMailingModelModule = ClientesMailingModelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([clientes_mailing_model_entity_1.ClientesMailingModel], 'sqlserverConnection'),
        ],
        controllers: [clientes_mailing_model_controller_1.ClientesMailingModelController],
        providers: [clientes_mailing_model_service_1.ClientesMailingModelService],
    })
], ClientesMailingModelModule);
//# sourceMappingURL=clientes-mailing-model.module.js.map