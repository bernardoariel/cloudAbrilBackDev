"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const productos_module_1 = require("./productos/productos.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const prod_costos_module_1 = require("./prod-costos/prod-costos.module");
const check_database_connection_middleware_1 = require("./check-database-connection/check-database-connection.middleware");
const prod_image_module_1 = require("./prod-image/prod-image.module");
const prod_stock_module_1 = require("./prod-stock/prod-stock.module");
const prod_sucursal_module_1 = require("./prod-sucursal/prod-sucursal.module");
const prod_marca_module_1 = require("./prod-marca/prod-marca.module");
const forma_pago_planes_module_1 = require("./forma-pago-planes/forma-pago-planes.module");
const forma_pago_module_1 = require("./forma-pago/forma-pago.module");
const auth_module_1 = require("./auth/auth.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const schedule_1 = require("@nestjs/schedule");
const tareas_module_1 = require("./tareas/tareas.module");
const clientes_mailing_model_module_1 = require("./clientes-mailing-model/clientes-mailing-model.module");
const clientes_module_1 = require("./clientes/clientes.module");
const clientes_ventas_module_1 = require("./clientes-ventas/clientes-ventas.module");
const clientes_ventas_detalle_module_1 = require("./clientes-ventas-detalle/clientes-ventas-detalle.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(check_database_connection_middleware_1.CheckDatabaseConnectionMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                name: 'sqlserverConnection',
                useFactory: (configService) => ({
                    type: 'mssql',
                    host: configService.get('DB_HOST_SQLSERVER'),
                    port: Number(configService.get('DB_PORT_SQLSERVER')) || 1435,
                    username: configService.get('DB_USERNAME_SQLSERVER'),
                    password: configService.get('DB_PASSWORD_SQLSERVER'),
                    database: configService.get('DB_DATABASE_SQLSERVER'),
                    options: {
                        encrypt: false,
                    },
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: false,
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            productos_module_1.ProductosModule,
            prod_costos_module_1.ProdCostosModule,
            prod_image_module_1.ProdImageModule,
            prod_stock_module_1.ProdStockModule,
            prod_sucursal_module_1.ProdSucursalModule,
            prod_marca_module_1.ProdMarcaModule,
            prod_marca_module_1.ProdMarcaModule,
            forma_pago_planes_module_1.FormaPagoPlanesModule,
            forma_pago_module_1.FormaPagoModule,
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            tareas_module_1.TareasModule,
            clientes_ventas_module_1.ClientesVentasModule,
            clientes_mailing_model_module_1.ClientesMailingModelModule, clientes_module_1.ClientesModule, clientes_ventas_detalle_module_1.ClientesVentasDetalleModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map