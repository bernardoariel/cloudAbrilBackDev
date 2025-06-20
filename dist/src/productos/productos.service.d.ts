import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ProdCostosService } from 'src/prod-costos/prod-costos.service';
import { ProdImageService } from 'src/prod-image/prod-image.service';
import { ProdStockService } from 'src/prod-stock/prod-stock.service';
import { ProdMarcaService } from 'src/prod-marca/prod-marca.service';
export declare class ProductosService {
    private productosRepository;
    private readonly prodCostosService;
    private readonly prodImageService;
    private readonly prodStockService;
    private readonly prodMarcaService;
    constructor(productosRepository: Repository<Producto>, prodCostosService: ProdCostosService, prodImageService: ProdImageService, prodStockService: ProdStockService, prodMarcaService: ProdMarcaService);
    onModuleInit(): Promise<void>;
    findAllProducts(): Promise<Producto[]>;
    findProductWithPrice(term: string): Promise<any>;
    findProductsByMarca(term: string): Promise<any>;
}
