import { Repository } from 'typeorm';
import { ClienteVenta } from './entities/cliente-venta.entity';
export declare class ClientesVentasService {
    private ClientesVentasRepository;
    constructor(ClientesVentasRepository: Repository<ClienteVenta>);
    findAll(): Promise<ClienteVenta[]>;
    findOne(id: number): string;
    findByFecha(desde: Date, hasta: Date): Promise<ClienteVenta[]>;
    findByFechaConCliente(desde: Date, hasta: Date): Promise<any[]>;
    findVentaCompleta(codVenta: number): Promise<{
        CodVenta: number;
        Fecha: Date;
        Total: number;
        FormaPago: string;
        Estado: string;
        cliente: {
            codCliente: string;
            nombre: string;
            nroDoc: number;
            telefonos: string;
        };
        detalles: {
            CodProducto: number;
            NombreProducto: string;
            Cantidad: number;
            PrecioUnit: number;
            Subtotal: number;
        }[];
    }>;
}
