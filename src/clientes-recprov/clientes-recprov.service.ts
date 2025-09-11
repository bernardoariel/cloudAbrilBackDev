import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteRecProv } from './entities/cliente-recprov.entity';

@Injectable()
export class ClientesRecProvService {
  private readonly logger = new Logger(ClientesRecProvService.name);

  constructor(
    @InjectRepository(ClienteRecProv, 'sqlserverConnection')
    private readonly clienteRecProvRepository: Repository<ClienteRecProv>,
  ) { }

  async findAll(): Promise<ClienteRecProv[]> {
    try {
      return this.clienteRecProvRepository.find();
    } catch (error) {
      this.logger.error('Error en findAll:', error);
      throw error;
    }
  }

  async findOne(codSucRecibo: string): Promise<ClienteRecProv> {
    try {
      return this.clienteRecProvRepository.findOne({ where: { codSucRecibo: Number(codSucRecibo) } });
    } catch (error) {
      this.logger.error('Error en findOne:', error);
      throw error;
    }
  }

  async findByFecha(fechaDesde: Date, fechaHasta: Date): Promise<ClienteRecProv[]> {
    try {
      this.logger.log(`Buscando registros desde ${fechaDesde} hasta ${fechaHasta}`);

      return this.clienteRecProvRepository
        .createQueryBuilder('recibo')
        .where('recibo.Fecha BETWEEN :desde AND :hasta', { desde: fechaDesde, hasta: fechaHasta })
        .orderBy('recibo.Fecha', 'ASC')
        .getMany();
    } catch (error) {
      this.logger.error('Error en findByFecha:', error);
      throw error;
    }
  }

  async findReciboCompleto(codSucRecibo: string) {
    try {
      const queryRunner = this.clienteRecProvRepository.manager.connection.createQueryRunner();

      const query = `
        SELECT 
          r.CodSucRecibo,
          r.CodReciboPr,
          r.CodCredito,
          r.Fecha,
          r.MontoPagado,
          r.CodCobrador,
          r.Observacion,
          r.MAtraso,
          r.SaldoReal,
          r.Usuario,
          r.Estado,
          r.FechaImpresion,
          r.Tipo,
          r.CodAsientoRec,
          r.CodForPago,
          c.Nombre,
          c.CodSucursal,
          c.NroDoc,
          co.NombreCont,
          co.ApellidoCont,
          CONCAT(co.Caracteristica, co.Numero) as Telefonos
        FROM Clientes_RecProv r
        INNER JOIN Clientes_Creditos cr ON r.CodCredito = cr.CodCredito
        INNER JOIN Clientes_Per c ON cr.CodCliente = c.CodCliente
        LEFT JOIN (
          SELECT CodCliente, NombreCont, ApellidoCont, Caracteristica, Numero
          FROM Clientes_Contactos 
          WHERE EsPrincipal = 'S'
        ) co ON c.CodCliente = co.CodCliente
        WHERE r.CodSucRecibo = @P0
      `;

      const result = await queryRunner.query(query, [codSucRecibo]);
      await queryRunner.release();

      return result[0]; // Retornar solo el primer resultado
    } catch (error) {
      this.logger.error('Error en findReciboCompleto:', error);
      throw error;
    }
  }

  async findByFechaConCliente(desde: Date, hasta: Date) {
    const fechaDesde = new Date(desde);
    fechaDesde.setHours(0, 0, 0, 0);

    const fechaHasta = new Date(hasta);
    fechaHasta.setHours(23, 59, 59, 999);

    return this.clienteRecProvRepository
      .createQueryBuilder('recibo')
      .innerJoin('Clientes_Creditos', 'credito', 'recibo.CodCredito = credito.CodCredito')
      .innerJoin('Clientes_Per', 'cliente', 'credito.CodCliente = cliente.CodCliente')
      .leftJoin(
        qb => qb
          .select('c.CodCliente, c.NombreCont, c.ApellidoCont, c.Caracteristica, c.Numero')
          .from('Clientes_Contactos', 'c')
          .where("c.EsPrincipal = 'S'"),
        'contacto',
        'credito.CodCliente = contacto.CodCliente'
      )
      .where('recibo.Fecha BETWEEN :desde AND :hasta', { desde: fechaDesde, hasta: fechaHasta })
      .select([
        'recibo.CodReciboPr',
        'recibo.CodCredito',
        'recibo.Fecha',
        'recibo.MontoPagado',
        'recibo.Estado',
        'recibo.SaldoReal',
        'recibo.CodForPago',
        'cliente.Nombre',
        'cliente.CodSucursal',
        'cliente.NroDoc',
        'contacto.NombreCont as NombreCont',
        'contacto.ApellidoCont as ApellidoCont',
        "CONCAT(contacto.Caracteristica, contacto.Numero) as Telefonos",
      ])
      .orderBy('recibo.Fecha', 'ASC')
      .getRawMany();
  }

  async findByCodCredito(codCredito: string): Promise<ClienteRecProv[]> {
    try {
      return this.clienteRecProvRepository.find({ where: { codCredito } });
    } catch (error) {
      this.logger.error('Error en findByCodCredito:', error);
      throw error;
    }
  }
} 