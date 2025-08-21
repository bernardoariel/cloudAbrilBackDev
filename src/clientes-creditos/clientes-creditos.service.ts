import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { ClienteCredito } from './entities/cliente-credito.entity';

@Injectable()
export class ClientesCreditosService {
  constructor(
    @InjectRepository(ClienteCredito, 'sqlserverConnection')
    private clientesCreditosRepository: Repository<ClienteCredito>,
  ) { }

  findByCodCredito(codCredito: string) {
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
  async findByCodClienteWithSaldo(
    codCliente: number,
    condicion: 'mayor' | 'menor' = 'mayor',
  ) {
    const qb = this.clientesCreditosRepository.createQueryBuilder('cc')
      .where('cc.CodCliente = :codCliente', { codCliente });

    if (condicion === 'mayor') {
      qb.andWhere('cc.SaldoCapital > 0');
    } else {
      qb.andWhere('cc.SaldoCapital <= 0');
    }

    return qb.getMany();
  }
} 