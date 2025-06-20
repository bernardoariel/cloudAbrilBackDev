import { ClienteVentaDetalle } from "src/clientes-ventas-detalle/entities/clientes-ventas-detalle.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
export declare class ClienteVenta {
    CodVenta: number;
    CodSucVenta: number;
    CodCliente: number;
    Fecha: Date;
    Total: number;
    FormaPago: string;
    CodVendedor: number;
    Estado: string;
    cliente: Cliente;
    detalles: ClienteVentaDetalle[];
}
