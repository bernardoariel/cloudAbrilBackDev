import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMetPagosService } from './clientes-metpagos.service';
import { ClientesMetPagosController } from './clientes-metpagos.controller';
import { ClienteMetPago } from './entities/cliente-metpago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteMetPago], 'sqlserverConnection')],
  controllers: [ClientesMetPagosController],
  providers: [ClientesMetPagosService],
})
export class ClientesMetPagosModule {} 