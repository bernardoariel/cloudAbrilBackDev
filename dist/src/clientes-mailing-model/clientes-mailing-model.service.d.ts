import { ClientesMailingModel } from './entities/clientes-mailing-model.entity';
import { Repository } from 'typeorm';
export declare class ClientesMailingModelService {
    private readonly repo;
    constructor(repo: Repository<ClientesMailingModel>);
    findAll(): Promise<ClientesMailingModel[]>;
}
