import { ProductosService } from './productos.service';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    findAll(): Promise<any>;
    findOne(term: string): Promise<any>;
    findProductsByMarca(term: string, marcas: string): Promise<any>;
}
