import { ProdCostos } from './entities/prod-costo.entity';
import { Repository } from 'typeorm';
export declare class ProdCostosService {
    private readonly prodCostosRepository;
    constructor(prodCostosRepository: Repository<ProdCostos>);
    findByCodProducto(codProducto: string): Promise<ProdCostos>;
}
