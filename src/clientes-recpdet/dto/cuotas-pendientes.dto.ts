export class CuotaPendienteDto {
    nroCuota: number;
    codCredito: string;
    monCuoCap: number;
    intFinCuo: number;
    ivaFinCuo: number;
    cuotaTotal: number;
    fechaVencimiento: Date;
    vencida: boolean;
    diasVencida: number;
    pagada: boolean;
    estado: string; // 'PAGADA', 'VENCIDA', 'PENDIENTE'
    codReciboOf?: string;
    fechaPago?: Date;
    // Detalles adicionales del pago si está pagada
    detallesPago?: {
        idPago: number;
        montoCapitalPagado: number;
        interesPagado: number;
        ivaPagado: number;
        interesPunitorioPagado: number;
        ivaPunitorioPagado: number;
        totalPagado: number;
        bonificacion: number;
    };
}

export class ResumenCreditoDto {
    codCredito: string;
    cantidadCuotas: number;
    cuotasPagadas: number;
    cuotasPendientes: number;
    cuotasVencidas: number;
    montoTotalCredito: number;
    montoPagado: number;
    montoPendiente: number;
    proximaCuotaVencida?: {
        nroCuota: number;
        fechaVencimiento: Date;
        monto: number;
        diasVencidos: number;
    };
    detalle: CuotaPendienteDto[];
}
