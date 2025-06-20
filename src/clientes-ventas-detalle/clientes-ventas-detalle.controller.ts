import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesVentasDetalleService } from './clientes-ventas-detalle.service';
import { CreateClientesVentasDetalleDto } from './dto/create-clientes-ventas-detalle.dto';
import { UpdateClientesVentasDetalleDto } from './dto/update-clientes-ventas-detalle.dto';

@Controller('clientes-ventas-detalle')
export class ClientesVentasDetalleController {
  constructor(private readonly clientesVentasDetalleService: ClientesVentasDetalleService) {}

  @Post()
  create(@Body() createClientesVentasDetalleDto: CreateClientesVentasDetalleDto) {
    return this.clientesVentasDetalleService.create(createClientesVentasDetalleDto);
  }

  @Get()
  findAll() {
    return this.clientesVentasDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesVentasDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientesVentasDetalleDto: UpdateClientesVentasDetalleDto) {
    return this.clientesVentasDetalleService.update(+id, updateClientesVentasDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesVentasDetalleService.remove(+id);
  }
}
