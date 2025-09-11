import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProdCostosModule } from './prod-costos/prod-costos.module';
import { CheckDatabaseConnectionMiddleware } from './check-database-connection/check-database-connection.middleware';
import { ProdImageModule } from './prod-image/prod-image.module';
import { ProdStockModule } from './prod-stock/prod-stock.module';
import { ProdSucursalModule } from './prod-sucursal/prod-sucursal.module';
import { ProdMarcaModule } from './prod-marca/prod-marca.module';
import { FormaPagoPlanesModule } from './forma-pago-planes/forma-pago-planes.module';
import { FormaPagoModule } from './forma-pago/forma-pago.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TareasModule } from './tareas/tareas.module';
import { ClientesMailingModelModule } from './clientes-mailing-model/clientes-mailing-model.module';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesVentasModule } from './clientes-ventas/clientes-ventas.module';
import { ClientesVentasDetalleModule } from './clientes-ventas-detalle/clientes-ventas-detalle.module';
import { ClientesContactosModule } from './clientes-contactos/clientes-contactos.module';
import { ClientesCreditosModule } from './clientes-creditos/clientes-creditos.module';
import { ClientesMetPagosModule } from './clientes-metpagos/clientes-metpagos.module';
import { VendedoresModule } from './vendedores/vendedores.module';
import { CobradoresModule } from './cobradores/cobradores.module';
import { ClientesRecProvModule } from './clientes-recprov/clientes-recprov.module';
import { ClientesCreditosVencimientosModule } from './clientes-creditos-vencimientos/clientes-creditos-vencimientos.module';
import { ClientesRecPagModule } from './clientes-recpag/clientes-recpag.module';
import { ClientesRecpdetModule } from './clientes-recpdet/clientes-recpdet.module';
import { ClientesRecProvDetModule } from './clientes-recprov-det/clientes-recprov-det.module';
import { LoginModule } from './login/login.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigModule esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'sqlserverConnection',
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST_SQLSERVER'),
        port: Number(configService.get<string>('DB_PORT_SQLSERVER')) || 1435,
        username: configService.get<string>('DB_USERNAME_SQLSERVER'),
        password: configService.get<string>('DB_PASSWORD_SQLSERVER'),
        database: configService.get<string>('DB_DATABASE_SQLSERVER'),
        options: {
          encrypt: false,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    //  TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   name: 'postgresConnection',
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DB_HOST_POSTGRES'),
    //     port: Number(configService.get<string>('DB_PORT_POSTGRES')) || 5432,
    //     username: configService.get<string>('DB_USERNAME_POSTGRES'),
    //     password: configService.get<string>('DB_PASSWORD_POSTGRES'),
    //     database: configService.get<string>('DB_DATABASE_POSTGRES'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: false,
    //   }),
    // }),

    ScheduleModule.forRoot(),
    ProductosModule,
    ProdCostosModule,
    ProdImageModule,
    ProdStockModule,
    ProdSucursalModule,
    ProdMarcaModule,
    ProdMarcaModule,
    FormaPagoPlanesModule,
    FormaPagoModule,
    AuthModule,
    UsuariosModule,
    TareasModule,
    ClientesVentasModule,
    ClientesMailingModelModule, ClientesModule, ClientesVentasDetalleModule, ClientesContactosModule, ClientesCreditosModule, ClientesMetPagosModule,
    VendedoresModule,
    CobradoresModule,
    ClientesRecProvModule,
    ClientesCreditosVencimientosModule,
    ClientesRecPagModule,
    ClientesRecpdetModule,
    ClientesRecProvDetModule,
    LoginModule,
    MercadoPagoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckDatabaseConnectionMiddleware)
      .forRoutes('*');
  }
}
