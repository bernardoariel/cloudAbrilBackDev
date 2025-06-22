import { ClienteVenta } from 'src/clientes-ventas/entities/cliente-venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
export declare class ClienteVentaDetalle {
    CodVenta: number;
    CodProducto: number;
    CodColor: number;
    Cantidad: number;
    PrecioUnit: number;
    Serie: string;
    Estado: string;
    IVA: number;
    EnService: boolean;
    Entrega: boolean;
    FecEntrega: Date;
    ProdCombo: string;
    venta: ClienteVenta;
    producto: Producto;
}
