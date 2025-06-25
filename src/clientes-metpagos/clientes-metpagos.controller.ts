import { Controller, Get, Param } from '@nestjs/common';
import { ClientesMetPagosService } from './clientes-metpagos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('clientes-metpagos')
export class ClientesMetPagosController {
  constructor(private readonly clientesMetPagosService: ClientesMetPagosService) {}

  @Get('venta/:codVenta')
  findByCodVenta(@Param('codVenta') codVenta: string) {
    return this.clientesMetPagosService.findByCodVenta(codVenta);
  }
} 