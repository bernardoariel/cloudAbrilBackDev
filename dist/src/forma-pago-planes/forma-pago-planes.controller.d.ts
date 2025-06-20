import { FormaPagoPlanesService } from './forma-pago-planes.service';
export declare class FormaPagoPlanesController {
    private readonly formaPagoPlanesService;
    constructor(formaPagoPlanesService: FormaPagoPlanesService);
    findAll(): Promise<import("./entities/forma-pago-plane.entity").FormaPagoPlanes[]>;
    findOne(CodForPago: string): Promise<import("./entities/forma-pago-plane.entity").FormaPagoPlanes[]>;
}
