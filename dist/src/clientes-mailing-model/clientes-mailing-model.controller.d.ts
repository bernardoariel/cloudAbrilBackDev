import { ClientesMailingModelService } from './clientes-mailing-model.service';
export declare class ClientesMailingModelController {
    private readonly clientesMailingModelService;
    constructor(clientesMailingModelService: ClientesMailingModelService);
    findAll(): Promise<import("./entities/clientes-mailing-model.entity").ClientesMailingModel[]>;
}
