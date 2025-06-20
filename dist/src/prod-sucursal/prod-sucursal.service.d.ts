import { Sucursal } from './entities/prod-sucursal.entity';
import { Repository } from 'typeorm';
export declare class ProdSucursalService {
    private sucursalRepository;
    constructor(sucursalRepository: Repository<Sucursal>);
    findAll(): Promise<Sucursal[]>;
    findOne(codSucursal: string): Promise<Sucursal>;
}
