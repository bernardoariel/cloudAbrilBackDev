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
var CheckDatabaseConnectionMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckDatabaseConnectionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CheckDatabaseConnectionMiddleware = CheckDatabaseConnectionMiddleware_1 = class CheckDatabaseConnectionMiddleware {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(CheckDatabaseConnectionMiddleware_1.name);
    }
    async use(req, res, next) {
        try {
            await this.dataSource.query('SELECT 1');
            next();
        }
        catch (error) {
            this.logger.error('Database connection failed', error);
            throw new common_1.HttpException('Service Unavailable', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
};
exports.CheckDatabaseConnectionMiddleware = CheckDatabaseConnectionMiddleware;
exports.CheckDatabaseConnectionMiddleware = CheckDatabaseConnectionMiddleware = CheckDatabaseConnectionMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)('sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CheckDatabaseConnectionMiddleware);
//# sourceMappingURL=check-database-connection.middleware.js.map