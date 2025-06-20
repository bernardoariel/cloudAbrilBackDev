import { FormaPago } from './entities/forma-pago.entity';
import { Repository } from 'typeorm';
export declare class FormaPagoService {
    private formaPagoRepository;
    constructor(formaPagoRepository: Repository<FormaPago>);
    findAll(): Promise<FormaPago[]>;
}
