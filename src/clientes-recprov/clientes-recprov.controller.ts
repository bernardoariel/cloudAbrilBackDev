import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientesRecProvService } from './clientes-recprov.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes RecProv')
@Controller('clientes-recprov')
export class ClientesRecProvController {
  constructor(private readonly clientesRecProvService: ClientesRecProvService) {}

  @Get()
  async findAll() {
    return await this.clientesRecProvService.findAll();
  }

  @Get('test')
  async testConnection() {
    try {
      // Intentar hacer una consulta simple para verificar la conexión
      const result = await this.clientesRecProvService.findAll();
      return {
        success: true,
        message: 'Conexión exitosa',
        count: result.length
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error de conexión',
        error: error.message
      };
    }
  }

  @Get(':codSucRecibo')
  async findOne(@Param('codSucRecibo') codSucRecibo: string) {
    return await this.clientesRecProvService.findOne(codSucRecibo);
  }

  @Get('/filtro/fecha')
  async findByFecha(
    @Query('desde') desde: string,
    @Query('hasta') hasta: string
  ) {
    const fechaDesde = new Date(`${desde}T00:00:00`);
    const fechaHasta = new Date(`${hasta}T00:00:00`);
    if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
      throw new Error('Invalid date format');
    }
    return this.clientesRecProvService.findByFecha(fechaDesde, fechaHasta);
  }
} 