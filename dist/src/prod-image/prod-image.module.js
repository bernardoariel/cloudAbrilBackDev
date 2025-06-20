"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdImageModule = void 0;
const common_1 = require("@nestjs/common");
const prod_image_service_1 = require("./prod-image.service");
const prod_image_entity_1 = require("./entities/prod-image.entity");
const typeorm_1 = require("@nestjs/typeorm");
let ProdImageModule = class ProdImageModule {
};
exports.ProdImageModule = ProdImageModule;
exports.ProdImageModule = ProdImageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([prod_image_entity_1.ProdImage], 'sqlserverConnection'),
        ],
        providers: [prod_image_service_1.ProdImageService],
        exports: [prod_image_service_1.ProdImageService]
    })
], ProdImageModule);
//# sourceMappingURL=prod-image.module.js.map