import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
export declare class ClientesService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    findAll(): Promise<Cliente[]>;
    findOne(codCliente: string): Promise<Cliente>;
}
