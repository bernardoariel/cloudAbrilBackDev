import { ProdStockService } from './prod-stock.service';
export declare class ProdStockController {
    private readonly prodStockService;
    constructor(prodStockService: ProdStockService);
    findAllByCodProducto(codProducto: string): Promise<import("./entities/prod-stock.entity").ProdStock[]>;
}
