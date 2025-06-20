import { ClientesVentasDetalleService } from './clientes-ventas-detalle.service';
import { CreateClientesVentasDetalleDto } from './dto/create-clientes-ventas-detalle.dto';
import { UpdateClientesVentasDetalleDto } from './dto/update-clientes-ventas-detalle.dto';
export declare class ClientesVentasDetalleController {
    private readonly clientesVentasDetalleService;
    constructor(clientesVentasDetalleService: ClientesVentasDetalleService);
    create(createClientesVentasDetalleDto: CreateClientesVentasDetalleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClientesVentasDetalleDto: UpdateClientesVentasDetalleDto): string;
    remove(id: string): string;
}
