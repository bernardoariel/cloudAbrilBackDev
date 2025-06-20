import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaPago } from './entities/forma-pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormaPagoService {

  constructor(
    @InjectRepository(FormaPago,'sqlserverConnection')
    private formaPagoRepository: Repository<FormaPago>
  ){}
  
  async findAll(): Promise<FormaPago[]> {
    return await this.formaPagoRepository.find();
  }
  
}
