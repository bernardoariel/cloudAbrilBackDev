import { Controller, Get, Param, Query } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }
  @Get('/filtro/fecha')
  async findByFecha(
    @Query('desde') desde:string,
    @Query('hasta') hasta:string
  ) {
    const fechaDesde = new Date(desde);
    const fechaHasta = new Date(hasta);
    if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
      throw new Error('Invalid date format');
    }
    const diff = Math.abs(fechaHasta.getTime() - fechaDesde.getTime());
    const dias = diff / (1000 * 3600 * 24);
    if (dias > 30) {
      throw new Error('The date range cannot exceed 30 days');
    }
    return this.ventasService.findByFecha(fechaDesde, fechaHasta);
  }

}
