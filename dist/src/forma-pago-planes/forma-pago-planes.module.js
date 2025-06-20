"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormaPagoPlanesModule = void 0;
const common_1 = require("@nestjs/common");
const forma_pago_planes_service_1 = require("./forma-pago-planes.service");
const forma_pago_planes_controller_1 = require("./forma-pago-planes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const forma_pago_plane_entity_1 = require("./entities/forma-pago-plane.entity");
const forma_pago_module_1 = require("../forma-pago/forma-pago.module");
let FormaPagoPlanesModule = class FormaPagoPlanesModule {
};
exports.FormaPagoPlanesModule = FormaPagoPlanesModule;
exports.FormaPagoPlanesModule = FormaPagoPlanesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([forma_pago_plane_entity_1.FormaPagoPlanes], 'sqlserverConnection'),
            forma_pago_module_1.FormaPagoModule
        ],
        controllers: [forma_pago_planes_controller_1.FormaPagoPlanesController],
        providers: [forma_pago_planes_service_1.FormaPagoPlanesService],
        exports: [forma_pago_planes_service_1.FormaPagoPlanesService]
    })
], FormaPagoPlanesModule);
//# sourceMappingURL=forma-pago-planes.module.js.map