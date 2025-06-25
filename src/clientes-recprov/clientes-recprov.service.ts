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
  ) {}

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
      return this.clienteRecProvRepository.findOne({ where: { codSucRecibo } });
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
} 