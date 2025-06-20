import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
export declare class VentasService {
    private ventasRepository;
    constructor(ventasRepository: Repository<Venta>);
    findAll(): Promise<Venta[]>;
    findOne(id: number): string;
    findByFecha(desde: Date, hasta: Date): Promise<Venta[]>;
}
