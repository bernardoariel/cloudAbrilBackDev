import { ProdCostosService } from './prod-costos.service';
import { ProdCostos } from './entities/prod-costo.entity';
export declare class ProdCostosController {
    private readonly prodCostosService;
    constructor(prodCostosService: ProdCostosService);
    findByCodProducto(codProducto: string): Promise<ProdCostos>;
}
