import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteRecpdet } from './entities/cliente-recpdet.entity';
import { CreateClienteRecpdetDto } from './dto/create-cliente-recpdet.dto';
import { UpdateClienteRecpdetDto } from './dto/update-cliente-recpdet.dto';
import { CuotaPendienteDto, ResumenCreditoDto } from './dto/cuotas-pendientes.dto';
import { ClienteCreditoVencimiento } from '../clientes-creditos-vencimientos/entities/cliente-credito-vencimiento.entity';
import { ClienteCredito } from '../clientes-creditos/entities/cliente-credito.entity';
import { CreditosVencidosDto, CreditoVencidoResumen } from './dto/creditos-vencidos.dto';
import { Cliente } from '../clientes/entities/cliente.entity';
import { obtenerCreditosVencidosOptimizado } from './utils/creditos-vencidos-optimizado';

@Injectable()
export class ClientesRecpdetService {
    constructor(
        @InjectRepository(ClienteRecpdet, 'sqlserverConnection')
        private clienteRecpdetRepository: Repository<ClienteRecpdet>,
        @InjectRepository(ClienteCreditoVencimiento, 'sqlserverConnection')
        private vencimientosRepository: Repository<ClienteCreditoVencimiento>,
        @InjectRepository(ClienteCredito, 'sqlserverConnection')
        private creditosRepository: Repository<ClienteCredito>,
        @InjectRepository(Cliente, 'sqlserverConnection')
        private clientesRepository: Repository<Cliente>,
    ) { }

    async create(createClienteRecpdetDto: CreateClienteRecpdetDto): Promise<ClienteRecpdet> {
        const nuevoRecpdet = this.clienteRecpdetRepository.create(createClienteRecpdetDto);
        return await this.clienteRecpdetRepository.save(nuevoRecpdet);
    }

    async findAll(): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find();
    }

    async findOne(id: number): Promise<ClienteRecpdet> {
        const recpdet = await this.clienteRecpdetRepository.findOne({ where: { ID: id } });

        if (!recpdet) {
            throw new NotFoundException(`Detalle de recibo con ID ${id} no encontrado`);
        }

        return recpdet;
    }

    async findByReciboOf(codReciboOf: string): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find({
            where: { codReciboOf }
        });
    }

    async findByCredito(codCredito: string): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find({
            where: { codCredito }
        });
    }

    async update(id: number, updateClienteRecpdetDto: UpdateClienteRecpdetDto): Promise<ClienteRecpdet> {
        const recpdet = await this.findOne(id);

        // Aplicar los cambios al objeto
        Object.assign(recpdet, updateClienteRecpdetDto);

        return await this.clienteRecpdetRepository.save(recpdet);
    }

    async remove(id: number): Promise<void> {
        const result = await this.clienteRecpdetRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Detalle de recibo con ID ${id} no encontrado`);
        }
    }

    async analizarCuotasPendientes(codCredito: string): Promise<ResumenCreditoDto> {
        // Obtener todos los vencimientos para este crédito
        const vencimientos = await this.vencimientosRepository.find({
            where: { CodCredito: codCredito },
            order: { NCuota: 'ASC' }
        });

        // Obtener todos los pagos para este crédito
        const pagos = await this.clienteRecpdetRepository.find({
            where: { codCredito },
            order: { nroCuota: 'ASC' }
        });

        // Mapa para facilitar la búsqueda de pagos por número de cuota
        const pagosPorCuota = new Map();
        pagos.forEach(pago => {
            pagosPorCuota.set(pago.nroCuota, pago);
        });

        const hoy = new Date();
        const detalle: CuotaPendienteDto[] = [];
        let cuotasPagadas = 0;
        let cuotasPendientes = 0;
        let cuotasVencidas = 0;
        let montoTotalCredito = 0;
        let montoPagado = 0;
        let montoPendiente = 0;

        // Procesar cada vencimiento
        vencimientos.forEach(vencimiento => {
            const pago = pagosPorCuota.get(vencimiento.NCuota);
            const fechaVencimiento = new Date(vencimiento.Vencimiento);
            const vencida = fechaVencimiento < hoy;
            const diasVencida = vencida ?
                Math.floor((hoy.getTime() - fechaVencimiento.getTime()) / (1000 * 60 * 60 * 24)) : 0;

            const cuotaTotal = vencimiento.Cuota_Total;
            montoTotalCredito += cuotaTotal;

            const cuotaInfo: CuotaPendienteDto = {
                nroCuota: vencimiento.NCuota,
                codCredito: vencimiento.CodCredito,
                monCuoCap: vencimiento.Cuota_Capital,
                intFinCuo: vencimiento.Cuota_Interes,
                ivaFinCuo: 0, // No está en los vencimientos
                cuotaTotal,
                fechaVencimiento,
                vencida,
                diasVencida,
                pagada: !!pago,
                estado: !!pago ? 'PAGADA' : (vencida ? 'VENCIDA' : 'PENDIENTE'),
                codReciboOf: pago?.codReciboOf,
                fechaPago: null // No tenemos esta información en la estructura actual
            };

            // Si la cuota está pagada, agregar detalles del pago
            if (pago) {
                const totalPagado =
                    (pago.monCuoCap || 0) +
                    (pago.intFinCuo || 0) +
                    (pago.ivaFinCuo || 0) +
                    (pago.intPunitCuo || 0) +
                    (pago.ivaPunitCuo || 0);

                cuotaInfo.detallesPago = {
                    idPago: pago.ID,
                    montoCapitalPagado: pago.monCuoCap || 0,
                    interesPagado: pago.intFinCuo || 0,
                    ivaPagado: pago.ivaFinCuo || 0,
                    interesPunitorioPagado: pago.intPunitCuo || 0,
                    ivaPunitorioPagado: pago.ivaPunitCuo || 0,
                    totalPagado: totalPagado,
                    bonificacion: pago.bonificacion || 0
                };
            }

            if (pago) {
                cuotasPagadas++;
                montoPagado += cuotaTotal;
            } else {
                cuotasPendientes++;
                montoPendiente += cuotaTotal;
                if (vencida) {
                    cuotasVencidas++;
                }
            }

            detalle.push(cuotaInfo);
        });

        // Buscar la próxima cuota vencida (no pagada y vencida)
        let proximaCuotaVencida = null;
        const cuotasVencidasPendientes = detalle
            .filter(c => !c.pagada && c.vencida)
            .sort((a, b) => a.nroCuota - b.nroCuota);

        if (cuotasVencidasPendientes.length > 0) {
            const cuota = cuotasVencidasPendientes[0];
            proximaCuotaVencida = {
                nroCuota: cuota.nroCuota,
                fechaVencimiento: cuota.fechaVencimiento,
                monto: cuota.cuotaTotal,
                diasVencidos: cuota.diasVencida
            };
        }

        return {
            codCredito,
            cantidadCuotas: vencimientos.length,
            cuotasPagadas,
            cuotasPendientes,
            cuotasVencidas,
            montoTotalCredito,
            montoPagado,
            montoPendiente,
            proximaCuotaVencida,
            detalle
        };
    }

    async obtenerCreditosVencidos(): Promise<CreditosVencidosDto> {
        // Paso 1: Obtener todos los vencimientos que estén vencidos y no pagados
        const hoy = new Date();

        // Obtener todos los vencimientos cuya fecha es menor a hoy
        const vencimientosVencidos = await this.vencimientosRepository
            .createQueryBuilder('venc')
            .where('venc.Vencimiento < :fecha', { fecha: hoy })
            .orderBy('venc.CodCredito', 'ASC')
            .addOrderBy('venc.NCuota', 'ASC')
            .getMany();

        // Organizamos los vencimientos por crédito
        const vencimientosPorCredito = new Map<string, ClienteCreditoVencimiento[]>();

        for (const vencimiento of vencimientosVencidos) {
            if (!vencimientosPorCredito.has(vencimiento.CodCredito)) {
                vencimientosPorCredito.set(vencimiento.CodCredito, []);
            }
            vencimientosPorCredito.get(vencimiento.CodCredito).push(vencimiento);
        }

        // Paso 2: Para cada crédito, verificar si hay pagos asociados
        const creditosVencidos: CreditoVencidoResumen[] = [];
        let montoTotalVencido = 0;

        for (const [codCredito, vencimientosCredito] of vencimientosPorCredito.entries()) {
            // Obtener pagos para este crédito
            const pagos = await this.clienteRecpdetRepository.find({
                where: { codCredito }
            });

            // Crear mapa de pagos por número de cuota
            const pagosPorCuota = new Map<number, ClienteRecpdet>();
            pagos.forEach(pago => {
                if (pago.nroCuota) {
                    pagosPorCuota.set(pago.nroCuota, pago);
                }
            });

            // Verificar si hay vencimientos no pagados
            const vencimientosNoPagados = vencimientosCredito.filter(
                venc => !pagosPorCuota.has(venc.NCuota)
            );

            if (vencimientosNoPagados.length > 0) {
                // Este crédito tiene vencimientos no pagados
                // Obtener información del crédito
                const credito = await this.creditosRepository.findOne({
                    where: { CodCredito: codCredito }
                });

                if (credito) {
                    let cliente = null;
                    try {
                        cliente = await this.clientesRepository.findOne({
                            where: { codCliente: credito.CodCliente.toString() }
                        });
                    } catch (error) {
                        // Si no se encuentra el cliente, continuamos sin el nombre
                    }

                    // Encontrar la primera cuota vencida no pagada
                    const proximaCuota = vencimientosNoPagados[0];
                    const diasVencidos = Math.floor(
                        (hoy.getTime() - new Date(proximaCuota.Vencimiento).getTime()) / (1000 * 60 * 60 * 24)
                    );

                    // Sumar al monto total vencido
                    montoTotalVencido += Number(proximaCuota.Cuota_Total.toFixed(2));

                    // Agregar este crédito a la lista
                    creditosVencidos.push({
                        codCredito,
                        codCliente: credito.CodCliente,
                        nombreCliente: cliente ? cliente.nombre : undefined,
                        fechaCredito: credito.Fecha,
                        montoTotal: Number(credito.MontoCapital.toFixed(2)),
                        saldoCapital: Number(credito.SaldoCapital.toFixed(2)),
                        cantidadCuotas: credito.CantCuotas,
                        cuotasVencidas: vencimientosNoPagados.length,
                        proximaCuotaVencida: {
                            nroCuota: proximaCuota.NCuota,
                            fechaVencimiento: new Date(proximaCuota.Vencimiento),
                            monto: Number(proximaCuota.Cuota_Total.toFixed(2)),
                            diasVencidos
                        }
                    });
                }
            }
        }

        // Ordenar los créditos por días vencidos (mayor a menor)
        creditosVencidos.sort((a, b) =>
            b.proximaCuotaVencida.diasVencidos - a.proximaCuotaVencida.diasVencidos
        );

        return {
            totalCreditosVencidos: creditosVencidos.length,
            montoTotalVencido: Number(montoTotalVencido.toFixed(2)),
            creditos: creditosVencidos
        };
    }

    async obtenerCreditosVencidosOptimizado(
        fechaDesde?: string,
        fechaHasta?: string
    ): Promise<CreditosVencidosDto> {
        return obtenerCreditosVencidosOptimizado(
            this.vencimientosRepository,
            fechaDesde,
            fechaHasta
        );
    }

    async obtenerCreditosPorDiasAtraso(
        diasAtraso: number
    ): Promise<CreditosVencidosDto> {
        // Importamos dinámicamente para evitar problemas de dependencia circular
        const { obtenerCreditosPorDiasAtraso } = require('./utils/creditos-por-dias-atraso-exacto');
        return obtenerCreditosPorDiasAtraso(
            this.vencimientosRepository,
            diasAtraso
        );
    }
}
