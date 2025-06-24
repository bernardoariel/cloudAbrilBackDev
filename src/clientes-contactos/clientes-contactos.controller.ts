import { Controller, Get, Param } from '@nestjs/common';
import { ClientesContactosService } from './clientes-contactos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('clientes-contactos')
export class ClientesContactosController {
  constructor(private readonly clientesContactosService: ClientesContactosService) {}

  @Get(':codCliente')
  findByCliente(@Param('codCliente') codCliente: number) {
    return this.clientesContactosService.findByCliente(+codCliente);
  }
} 