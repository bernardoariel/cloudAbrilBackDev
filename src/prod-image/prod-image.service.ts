import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdImage } from './entities/prod-image.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProdImageService {
  constructor(
    @InjectRepository(ProdImage,'sqlserverConnection')
    private prodImagenesRepository: Repository<ProdImage>,
  ) {}
  async findByCodProducto(codProducto: string): Promise<ProdImage | undefined> {
    return this.prodImagenesRepository.findOne({ where: { CodProducto: codProducto } });
  }
}
