import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaPagoPlanes } from './entities/forma-pago-plane.entity';
import { Repository } from 'typeorm';
import { FormaPago } from 'src/forma-pago/entities/forma-pago.entity';



@Injectable()
export class FormaPagoPlanesService {
  
  constructor(
    @InjectRepository(FormaPagoPlanes,'sqlserverConnection')
    private formaPagoPlanesRepository:Repository<FormaPagoPlanes>,
  ){}

  async findAll(): Promise<FormaPagoPlanes[]> {
    return await this.formaPagoPlanesRepository.find();
  }

  async findOne(CodForPago: string): Promise<FormaPagoPlanes[]> {
    const results = await this.formaPagoPlanesRepository.find({ where: { CodForPago } });
    console.log(results);  // Verifica los resultados en la consola
    return results;
  }
  
  
}

