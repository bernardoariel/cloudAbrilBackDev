import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteContacto } from './entities/cliente-contacto.entity';

@Injectable()
export class ClientesContactosService {
  constructor(
    @InjectRepository(ClienteContacto, 'sqlserverConnection')
    private clientesContactosRepository: Repository<ClienteContacto>,
  ) {}

  findAll() {
    return this.clientesContactosRepository.find();
  }

  findByCliente(codCliente: number) {
    return this.clientesContactosRepository.find({
      where: { CodCliente: codCliente },
    });
  }
} 