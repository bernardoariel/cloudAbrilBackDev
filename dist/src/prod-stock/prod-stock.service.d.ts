import { ProdStock } from './entities/prod-stock.entity';
import { Repository } from 'typeorm';
export declare class ProdStockService {
    private prodStockRepository;
    private stockCache;
    constructor(prodStockRepository: Repository<ProdStock>);
    loadStockCache(): Promise<void>;
    getStockFromCache(codProducto: string): {
        CodProducto: string;
        totalCantidad: number;
    } | undefined;
    getAllStockFromCache(): {
        CodProducto: string;
        totalCantidad: number;
    }[];
    findByCodProductoWithStock(codProducto: string): Promise<ProdStock[]>;
}
