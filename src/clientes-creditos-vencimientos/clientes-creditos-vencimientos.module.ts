import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteCreditoVencimiento } from './entities/cliente-credito-vencimiento.entity';
import { ClientesCreditosVencimientosService } from './clientes-creditos-vencimientos.service';
import { ClientesCreditosVencimientosController } from './clientes-creditos-vencimientos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteCreditoVencimiento], 'sqlserverConnection')],
  controllers: [ClientesCreditosVencimientosController],
  providers: [ClientesCreditosVencimientosService],
})
export class ClientesCreditosVencimientosModule {} 