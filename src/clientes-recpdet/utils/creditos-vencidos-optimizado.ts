import { CreditosVencidosDto, CreditoVencidoResumen } from "../dto/creditos-vencidos.dto";

export async function obtenerCreditosVencidosOptimizado(
    vencimientosRepository: any, // Repositorio de ClienteCreditoVencimiento
    fechaDesde?: string,
    fechaHasta?: string
): Promise<CreditosVencidosDto> {
    const queryRunner = vencimientosRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
        // Construir la consulta SQL para obtener créditos vencidos con todos los detalles necesarios en una sola consulta
        let query = `
            SELECT 
                cv.CodCredito,
                cc.CodCliente,
                cp.Nombre as NombreCliente,
                cc.Fecha as FechaCredito,
                cc.MontoCapital as MontoTotal,
                cc.SaldoCapital,
                cc.CantCuotas,
                COUNT(cv.idVencimiento) as CuotasVencidas,
                MIN(cv.NCuota) as ProximaCuotaNro,
                MIN(cv.Vencimiento) as ProximaFechaVencimiento,
                MIN(cv.Cuota_Total) as ProximaCuotaMonto,
                DATEDIFF(day, MIN(cv.Vencimiento), GETDATE()) as DiasVencidos
            FROM 
                Clientes_Creditos_Vencimientos cv
            INNER JOIN 
                Clientes_Creditos cc ON cv.CodCredito = cc.CodCredito
            LEFT JOIN 
                Clientes_Per cp ON CONVERT(varchar, cc.CodCliente) = cp.CodCliente
            LEFT JOIN 
                Clientes_RecPDet crd ON cv.CodCredito = crd.CodCredito AND cv.NCuota = crd.NroCuota
            WHERE 
                cv.Vencimiento < GETDATE() 
                AND crd.ID IS NULL
        `;

        // Agregar filtros por fecha si se proporcionan
        const parameters: any[] = [];

        if (fechaDesde) {
            query += ` AND cc.Fecha >= @0`;
            parameters.push(new Date(fechaDesde));
        }

        if (fechaHasta) {
            query += ` AND cc.Fecha <= @${parameters.length}`;
            parameters.push(new Date(fechaHasta));
        }

        query += `
            GROUP BY 
                cv.CodCredito, cc.CodCliente, cp.Nombre, cc.Fecha, cc.MontoCapital, cc.SaldoCapital, cc.CantCuotas
            ORDER BY 
                DiasVencidos DESC
        `;

        // Ejecutar la consulta
        const creditosVencidos = await queryRunner.manager.query(query, parameters);

        // Calcular el monto total vencido y redondearlo a 2 decimales
        const montoTotalVencido = Number(
            creditosVencidos.reduce(
                (sum: number, credito: any) => sum + Number(credito.ProximaCuotaMonto || 0), 0
            ).toFixed(2)
        );

        const resultado: CreditosVencidosDto = {
            totalCreditosVencidos: creditosVencidos.length,
            montoTotalVencido,
            creditos: creditosVencidos.map((c: any): CreditoVencidoResumen => ({
                codCredito: c.CodCredito,
                codCliente: c.CodCliente,
                nombreCliente: c.NombreCliente,
                fechaCredito: c.FechaCredito,
                montoTotal: Number(Number(c.MontoTotal).toFixed(2)),
                saldoCapital: Number(Number(c.SaldoCapital).toFixed(2)),
                cantidadCuotas: c.CantCuotas,
                cuotasVencidas: Number(c.CuotasVencidas),
                proximaCuotaVencida: {
                    nroCuota: Number(c.ProximaCuotaNro),
                    fechaVencimiento: new Date(c.ProximaFechaVencimiento),
                    monto: Number(Number(c.ProximaCuotaMonto).toFixed(2)),
                    diasVencidos: Number(c.DiasVencidos)
                }
            }))
        };

        return resultado;
    } finally {
        // Liberar el queryRunner
        await queryRunner.release();
    }
}
