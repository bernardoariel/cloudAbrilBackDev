import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoController } from './mercado-pago.controller';
import { MercadoPagoService } from './mercado-pago.service';
import { ClienteCreditoVencimiento } from '../clientes-creditos-vencimientos/entities/cliente-credito-vencimiento.entity';
import { ClienteCredito } from '../clientes-creditos/entities/cliente-credito.entity';
import { MercadoPagoTransaccion } from './entities/mercadopago-transaccion.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ClienteCreditoVencimiento, ClienteCredito, MercadoPagoTransaccion], 'sqlserverConnection'),
    ],
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService],
    exports: [MercadoPagoService],
})
export class MercadoPagoModule { }
