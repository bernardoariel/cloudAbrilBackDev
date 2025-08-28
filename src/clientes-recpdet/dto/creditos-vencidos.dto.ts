export interface CreditoVencidoResumen {
    codCredito: string;
    codCliente: number;
    nombreCliente?: string;
    fechaCredito: Date;
    montoTotal: number;
    saldoCapital: number;
    cantidadCuotas: number;
    cuotasVencidas: number;
    proximaCuotaVencida: {
        nroCuota: number;
        fechaVencimiento: Date;
        monto: number;
        diasVencidos: number;
    };
}

export class CreditosVencidosDto {
    totalCreditosVencidos: number;
    montoTotalVencido: number;
    creditos: CreditoVencidoResumen[];
}
