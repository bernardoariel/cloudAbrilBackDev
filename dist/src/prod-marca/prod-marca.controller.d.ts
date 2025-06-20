import { ProdMarcaService } from './prod-marca.service';
export declare class ProdMarcaController {
    private readonly prodMarcaService;
    constructor(prodMarcaService: ProdMarcaService);
    findAll(): Promise<import("./entities/prod-marca.entity").ProdMarca[]>;
    findOne(CodMarca: string): Promise<import("./entities/prod-marca.entity").ProdMarca>;
}
