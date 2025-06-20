import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from './entities/prod-sucursal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdSucursalService {

  constructor(
    @InjectRepository(Sucursal,'sqlserverConnection')
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async findAll() {
    return await this.sucursalRepository.find();
  }

  async findOne(codSucursal: string) {
    return await this.sucursalRepository.findOne({ where: { CodSucursal: codSucursal } });
  }
}
