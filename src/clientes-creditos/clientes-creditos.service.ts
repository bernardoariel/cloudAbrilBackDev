import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { ClienteCredito } from './entities/cliente-credito.entity';
import { ClientesRecProvService } from '../clientes-recprov/clientes-recprov.service';

@Injectable()
export class ClientesCreditosService {
  constructor(
    @InjectRepository(ClienteCredito, 'sqlserverConnection')
    private clientesCreditosRepository: Repository<ClienteCredito>,
    private clientesRecProvService: ClientesRecProvService,
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

  async findByCodClienteConRecibos(codCliente: number) {
    // Primero, obtenemos todos los créditos del cliente
    const creditos = await this.clientesCreditosRepository.find({
      where: { CodCliente: codCliente },
    });

    // Para cada crédito, obtenemos sus recibos correspondientes y agregamos solo el codReciboPr
    const creditosConRecibos = await Promise.all(
      creditos.map(async (credito) => {
        // Obtenemos los recibos para este crédito
        const recibos = await this.clientesRecProvService.findByCodCredito(credito.CodCredito);

        // Devolvemos el crédito con solo el codReciboPr como propiedad adicional
        if (recibos && recibos.length > 0) {
          return {
            ...credito,
            codReciboPr: recibos[0].codReciboPr
          };
        }

        // Si no hay recibos, devolvemos el crédito sin cambios
        return credito;
      })
    );

    return creditosConRecibos;
  }

  async findByCodCreditoConRecibo(codCredito: string) {
    // Obtenemos el crédito
    const credito = await this.clientesCreditosRepository.findOne({
      where: { CodCredito: codCredito },
    });

    if (!credito) {
      return null;
    }

    // Obtenemos los recibos para este crédito
    const recibos = await this.clientesRecProvService.findByCodCredito(codCredito);

    // Solo agregamos la propiedad codReciboPr si hay recibos
    if (recibos && recibos.length > 0) {
      // Devolvemos el crédito tal como está, pero con la propiedad adicional
      return {
        ...credito,
        codReciboPr: recibos[0].codReciboPr,
      };
    }

    // Si no hay recibos, solo devolvemos el crédito original
    return credito;
  }
} 