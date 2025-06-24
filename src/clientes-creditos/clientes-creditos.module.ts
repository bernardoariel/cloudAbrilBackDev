import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesCreditosService } from './clientes-creditos.service';
import { ClientesCreditosController } from './clientes-creditos.controller';
import { ClienteCredito } from './entities/cliente-credito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteCredito], 'sqlserverConnection')],
  controllers: [ClientesCreditosController],
  providers: [ClientesCreditosService],
})
export class ClientesCreditosModule {} 