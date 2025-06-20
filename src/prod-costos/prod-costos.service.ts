import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdCostos } from './entities/prod-costo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdCostosService {
  constructor(
    @InjectRepository(ProdCostos, 'sqlserverConnection')
    private readonly prodCostosRepository: Repository<ProdCostos>,
  ) {}

  async findByCodProducto(codProducto: string): Promise<ProdCostos> {
    return this.prodCostosRepository.findOne({ where: { CodProducto: codProducto } });
  }
}
