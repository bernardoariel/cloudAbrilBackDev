import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClienteVenta } from './entities/cliente-venta.entity';
import { ClientesVentasService } from './clientes-ventas.service';
import { ClientesVentasController } from './clientes-ventas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteVenta], 'sqlserverConnection')],
  controllers: [ClientesVentasController],
  providers: [ClientesVentasService],
  exports:[ClientesVentasService]
})
export class ClientesVentasModule {}
