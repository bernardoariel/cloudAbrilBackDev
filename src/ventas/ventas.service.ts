import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Between, Repository } from 'typeorm';


@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta,'sqlserverConnection')
    private ventasRepository: Repository<Venta>,
  ){}
  
  async findAll() {
    return this.ventasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  async findByFecha(desde: Date, hasta: Date): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: {
        Fecha: Between(desde, hasta),
      },
      order: {
        Fecha: 'ASC',
      },
    });
  }

}
