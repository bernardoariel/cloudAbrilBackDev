import { Controller, Get, Param } from '@nestjs/common';
import { ClientesCreditosVencimientosService } from './clientes-creditos-vencimientos.service';
import { ClienteCreditoVencimiento } from './entities/cliente-credito-vencimiento.entity';

@Controller('clientes-creditos-vencimientos')
export class ClientesCreditosVencimientosController {
  constructor(private readonly service: ClientesCreditosVencimientosService) {}

  @Get(':CodCredito')
  async getByCodCredito(@Param('CodCredito') CodCredito: string): Promise<ClienteCreditoVencimiento[]> {
    return this.service.findByCodCredito(CodCredito);
  }
} 