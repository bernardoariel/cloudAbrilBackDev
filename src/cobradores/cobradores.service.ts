import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cobrador } from './entities/cobrador.entity';

@Injectable()
export class CobradoresService {
  constructor(
    @InjectRepository(Cobrador, 'sqlserverConnection')
    private readonly cobradorRepository: Repository<Cobrador>,
  ) {}

  async findAll(): Promise<Cobrador[]> {
    return this.cobradorRepository.find();
  }

  async findOne(codCobrador: string): Promise<Cobrador> {
    return this.cobradorRepository.findOne({ where: { codCobrador } });
  }
} 