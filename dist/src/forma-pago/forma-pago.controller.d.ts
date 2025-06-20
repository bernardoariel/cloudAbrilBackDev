import { FormaPagoService } from './forma-pago.service';
export declare class FormaPagoController {
    private readonly formaPagoService;
    constructor(formaPagoService: FormaPagoService);
    findAll(): Promise<import("./entities/forma-pago.entity").FormaPago[]>;
}
