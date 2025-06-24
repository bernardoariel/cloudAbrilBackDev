import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesContactosService } from './clientes-contactos.service';
import { ClientesContactosController } from './clientes-contactos.controller';
import { ClienteContacto } from './entities/cliente-contacto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteContacto], 'sqlserverConnection')],
  controllers: [ClientesContactosController],
  providers: [ClientesContactosService],
})
export class ClientesContactosModule {} 