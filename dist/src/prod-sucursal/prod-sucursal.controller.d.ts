import { ProdSucursalService } from './prod-sucursal.service';
export declare class ProdSucursalController {
    private readonly prodSucursalService;
    constructor(prodSucursalService: ProdSucursalService);
    findAll(): Promise<import("./entities/prod-sucursal.entity").Sucursal[]>;
    findOne(codSucursal: string): Promise<import("./entities/prod-sucursal.entity").Sucursal>;
}
