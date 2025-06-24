import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteCredito } from './entities/cliente-credito.entity';

@Injectable()
export class ClientesCreditosService {
  constructor(
    @InjectRepository(ClienteCredito, 'sqlserverConnection')
    private clientesCreditosRepository: Repository<ClienteCredito>,
  ) {}

  findByCodCredito(codCredito: number) {
    return this.clientesCreditosRepository.find({
      where: { CodCredito: codCredito },
    });
  }

  findByCodCliente(codCliente: number) {
    return this.clientesCreditosRepository.find({
      where: { CodCliente: codCliente },
    });
  }

  findByCodVenta(codVenta: string) {
    return this.clientesCreditosRepository.find({
      where: { CodVenta: codVenta },
    });
  }
} 