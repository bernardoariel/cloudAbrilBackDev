import { CreateClientesVentasDetalleDto } from './dto/create-clientes-ventas-detalle.dto';
import { UpdateClientesVentasDetalleDto } from './dto/update-clientes-ventas-detalle.dto';
export declare class ClientesVentasDetalleService {
    create(createClientesVentasDetalleDto: CreateClientesVentasDetalleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClientesVentasDetalleDto: UpdateClientesVentasDetalleDto): string;
    remove(id: number): string;
}
