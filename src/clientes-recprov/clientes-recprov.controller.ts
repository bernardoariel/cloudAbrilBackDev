import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientesRecProvService } from './clientes-recprov.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes RecProv')
@Controller('clientes-recprov')
export class ClientesRecProvController {
  constructor(private readonly clientesRecProvService: ClientesRecProvService) { }

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
    return this.clientesRecProvService.findByFechaConCliente(fechaDesde, fechaHasta);
  }

  @Get('completa/:codSucRecibo')
  async findReciboCompleto(@Param('codSucRecibo') codSucRecibo: string) {
    return this.clientesRecProvService.findReciboCompleto(codSucRecibo);
  }

  @Get('por-credito/:codCredito')
  async findByCodCredito(@Param('codCredito') codCredito: string) {
    return this.clientesRecProvService.findByCodCredito(codCredito);
  }
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




  @Get('test-simple/:codSucRecibo')
  async testSimple(@Param('codSucRecibo') codSucRecibo: string) {
    try {
      const queryRunner = this.clientesRecProvService['clienteRecProvRepository'].manager.connection.createQueryRunner();

      const query = `
        SELECT TOP 1 *
        FROM Clientes_RecProv 
        WHERE CodSucRecibo = @P0
      `;

      const result = await queryRunner.query(query, [codSucRecibo]);
      await queryRunner.release();

      return {
        success: true,
        data: result[0] || null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }


} 