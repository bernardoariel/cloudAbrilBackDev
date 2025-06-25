import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteMetPago } from './entities/cliente-metpago.entity';

@Injectable()
export class ClientesMetPagosService {
  constructor(
    @InjectRepository(ClienteMetPago, 'sqlserverConnection')
    private clientesMetPagosRepository: Repository<ClienteMetPago>,
  ) {}

  findByCodVenta(codVenta: string) {
    return this.clientesMetPagosRepository.find({
      where: { CodVenta: codVenta },
    });
  }
} 