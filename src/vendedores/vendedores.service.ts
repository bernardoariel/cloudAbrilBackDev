import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendedor } from './entities/vendedor.entity';

@Injectable()
export class VendedoresService {
  constructor(
    @InjectRepository(Vendedor, 'sqlserverConnection')
    private readonly vendedorRepository: Repository<Vendedor>,
  ) {}

  async findAll(): Promise<Vendedor[]> {
    return this.vendedorRepository.find();
  }

  async findOne(codVendedor: string): Promise<Vendedor> {
    return this.vendedorRepository.findOne({ where: { codVendedor } });
  }
} 