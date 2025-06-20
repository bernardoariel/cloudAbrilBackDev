import { ProdImage } from './entities/prod-image.entity';
import { Repository } from 'typeorm';
export declare class ProdImageService {
    private prodImagenesRepository;
    constructor(prodImagenesRepository: Repository<ProdImage>);
    findByCodProducto(codProducto: string): Promise<ProdImage | undefined>;
}
