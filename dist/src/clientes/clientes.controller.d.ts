import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(): Promise<Cliente[]>;
    findOne(codCliente: string): Promise<Cliente>;
}
