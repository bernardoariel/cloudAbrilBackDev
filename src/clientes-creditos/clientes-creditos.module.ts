import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesCreditosService } from './clientes-creditos.service';
import { ClientesCreditosController } from './clientes-creditos.controller';
import { ClienteCredito } from './entities/cliente-credito.entity';
import { ClientesRecProvModule } from '../clientes-recprov/clientes-recprov.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClienteCredito], 'sqlserverConnection'),
    ClientesRecProvModule,
  ],
  controllers: [ClientesCreditosController],
  providers: [ClientesCreditosService],
})
export class ClientesCreditosModule { } 