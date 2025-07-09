import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteCreditoVencimiento } from './entities/cliente-credito-vencimiento.entity';

@Injectable()
export class ClientesCreditosVencimientosService {
  constructor(
    @InjectRepository(ClienteCreditoVencimiento, 'sqlserverConnection')
    private readonly vencimientosRepository: Repository<ClienteCreditoVencimiento>,
  ) {}

  async findByCodCredito(CodCredito: string): Promise<ClienteCreditoVencimiento[]> {
    return this.vencimientosRepository.find({ where: { CodCredito } });
  }
} 