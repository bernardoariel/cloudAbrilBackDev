import { CreditosVencidosDto, CreditoVencidoResumen } from "../dto/creditos-vencidos.dto";

export async function obtenerCreditosPorDiasAtraso(
    vencimientosRepository: any,
    diasAtraso: number
): Promise<CreditosVencidosDto> {
    const queryRunner = vencimientosRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();

    try {
        // Calculamos la fecha límite a partir de los días de atraso
        const fechaActual = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() - diasAtraso);

        // Construir la consulta SQL para obtener créditos vencidos con atraso mayor o igual a los días especificados
        const query = `
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
                cv.Vencimiento <= @0
                AND crd.ID IS NULL
            GROUP BY 
                cv.CodCredito, cc.CodCliente, cp.Nombre, cc.Fecha, cc.MontoCapital, cc.SaldoCapital, cc.CantCuotas
            ORDER BY 
                DiasVencidos DESC
        `;

        // Ejecutar la consulta con la fecha límite como parámetro
        const creditosVencidos = await queryRunner.manager.query(query, [fechaLimite]);

        // Calcular el monto total vencido y redondearlo a 2 decimales
        const montoTotalVencido = Number(
            creditosVencidos.reduce(
                (sum: number, credito: any) => sum + Number(credito.ProximaCuotaMonto || 0), 0
            ).toFixed(2)
        );

        // Mapear los resultados al formato esperado
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
