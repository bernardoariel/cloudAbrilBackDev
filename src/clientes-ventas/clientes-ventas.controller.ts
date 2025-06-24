import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ClientesVentasService } from './clientes-ventas.service';

@ApiTags('Abril-SqlServer')
@Controller('clientes-ventas')
export class ClientesVentasController {
  constructor(private readonly clientesVentasService: ClientesVentasService) {}

  @Get()
  findAll() {
    return this.clientesVentasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesVentasService.findOne(+id);
  }
  @Get('/filtro/fecha')
  async findByFecha(
    @Query('desde') desde:string,
    @Query('hasta') hasta:string
  ) {
    const fechaDesde = new Date(`${desde}T00:00:00`);
    const fechaHasta = new Date(`${hasta}T00:00:00`);
    if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
      throw new Error('Invalid date format');
    }
    const diff = Math.abs(fechaHasta.getTime() - fechaDesde.getTime());
    const dias = diff / (1000 * 3600 * 24);
    if (dias > 30) {
      throw new Error('The date range cannot exceed 30 days');
    }
    return this.clientesVentasService.findByFechaConCliente(fechaDesde, fechaHasta);
  }
  @Get('completa/:codVenta')
  async findVentaCompleta(@Param('codVenta') codVenta: number) {
    return this.clientesVentasService.findVentaCompleta(+codVenta);
  }
}
