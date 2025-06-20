import { Module } from '@nestjs/common';
import { ClientesVentasDetalleService } from './clientes-ventas-detalle.service';
import { ClientesVentasDetalleController } from './clientes-ventas-detalle.controller';

@Module({
  controllers: [ClientesVentasDetalleController],
  providers: [ClientesVentasDetalleService],
})
export class ClientesVentasDetalleModule {}
