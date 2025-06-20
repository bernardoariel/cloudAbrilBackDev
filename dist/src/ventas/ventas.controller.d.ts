import { VentasService } from './ventas.service';
export declare class VentasController {
    private readonly ventasService;
    constructor(ventasService: VentasService);
    findAll(): Promise<import("./entities/venta.entity").Venta[]>;
    findOne(id: string): string;
    findByFecha(desde: string, hasta: string): Promise<import("./entities/venta.entity").Venta[]>;
}
