import { Repository } from 'typeorm';
import { ProdMarca } from './entities/prod-marca.entity';
export declare class ProdMarcaService {
    private prodMarcaRepository;
    constructor(prodMarcaRepository: Repository<ProdMarca>);
    findAll(): Promise<ProdMarca[]>;
    findByNombre(nombreMarca: string): Promise<ProdMarca>;
    findOne(CodMarca: number): Promise<ProdMarca>;
}
