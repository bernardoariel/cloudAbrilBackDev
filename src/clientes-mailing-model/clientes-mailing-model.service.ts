import { Injectable } from '@nestjs/common';
import { CreateClientesMailingModelDto } from './dto/create-clientes-mailing-model.dto';
import { UpdateClientesMailingModelDto } from './dto/update-clientes-mailing-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesMailingModel } from './entities/clientes-mailing-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesMailingModelService {
  constructor(
    @InjectRepository(ClientesMailingModel, 'sqlserverConnection')
    private readonly  repo: Repository<ClientesMailingModel>,
  ) {}
  findAll() {
    return this.repo.find();
  }

}
