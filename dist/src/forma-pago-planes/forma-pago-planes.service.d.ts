import { FormaPagoPlanes } from './entities/forma-pago-plane.entity';
import { Repository } from 'typeorm';
export declare class FormaPagoPlanesService {
    private formaPagoPlanesRepository;
    constructor(formaPagoPlanesRepository: Repository<FormaPagoPlanes>);
    findAll(): Promise<FormaPagoPlanes[]>;
    findOne(CodForPago: string): Promise<FormaPagoPlanes[]>;
}
