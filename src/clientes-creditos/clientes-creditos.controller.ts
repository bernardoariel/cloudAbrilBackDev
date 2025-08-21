import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientesCreditosService } from './clientes-creditos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('clientes-creditos')
export class ClientesCreditosController {
  constructor(private readonly clientesCreditosService: ClientesCreditosService) { }

  @Get('credito/:codCredito')
  findByCodCredito(@Param('codCredito') codCredito: string) {
    return this.clientesCreditosService.findByCodCredito(codCredito);
  }

  @Get('cliente/:codCliente')
  findByCodCliente(@Param('codCliente') codCliente: number) {
    return this.clientesCreditosService.findByCodCliente(+codCliente);
  }

  @Get('venta/:codVenta')
  findByCodVenta(@Param('codVenta') codVenta: string) {
    return this.clientesCreditosService.findByCodVenta(codVenta);
  }
  @Get('venta/:codCliente/saldo')
  findByCodClienteWithSaldo(
    @Param('codCliente') codCliente: number,
    @Query('condicion') condicion: 'mayor' | 'menor' = 'mayor',
  ) {
    return this.clientesCreditosService.findByCodClienteWithSaldo(+codCliente, condicion);
  }



} 