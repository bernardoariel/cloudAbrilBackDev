import { ClientesVentasService } from './clientes-ventas.service';
export declare class ClientesVentasController {
    private readonly clientesVentasService;
    constructor(clientesVentasService: ClientesVentasService);
    findAll(): Promise<import("./entities/cliente-venta.entity").ClienteVenta[]>;
    findOne(id: string): string;
    findByFecha(desde: string, hasta: string): Promise<any[]>;
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
