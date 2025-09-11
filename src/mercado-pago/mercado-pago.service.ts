import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ClienteCreditoVencimiento } from '../clientes-creditos-vencimientos/entities/cliente-credito-vencimiento.entity';
import { ClienteCredito } from '../clientes-creditos/entities/cliente-credito.entity';
import { MercadoPagoTransaccion } from './entities/mercadopago-transaccion.entity';

@Injectable()
export class MercadoPagoService {
    private client: any;
    private accessToken: string;
    private isProduction: boolean;

    constructor(
        private configService: ConfigService,
        @InjectRepository(ClienteCreditoVencimiento, 'sqlserverConnection')
        private creditoVencimientoRepository: Repository<ClienteCreditoVencimiento>,
        @InjectRepository(ClienteCredito, 'sqlserverConnection')
        private creditoRepository: Repository<ClienteCredito>,
        @InjectRepository(MercadoPagoTransaccion, 'sqlserverConnection')
        private transaccionRepository: Repository<MercadoPagoTransaccion>,
    ) {
        // Configuración del cliente de Mercado Pago
        this.accessToken = this.configService.get<string>('MERCADOPAGO_ACCESS_TOKEN');
        this.client = new MercadoPagoConfig({
            accessToken: this.accessToken
        });

        // Determinar si estamos en producción
        const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
        this.isProduction = nodeEnv === 'production';
    }

    /**
     * Función de utilidad para logs que solo se muestran en desarrollo
     */
    private log(message: string, data?: any): void {
        if (!this.isProduction) {
            if (data) {
                console.log(message, data);
            } else {
                console.log(message);
            }
        }
    }

    /**
     * Función de utilidad para logs de error
     */
    private logError(message: string, error?: any): void {
        if (!this.isProduction) {
            if (error) {
                console.error(message, error);
            } else {
                console.error(message);
            }
        }
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    async createSimplePreference(data: { title: string, price: number }) {
        try {
            const preference = new Preference(this.client);

            this.log(`Creando preferencia simple con precio: ${data.price}`);

            const preferenceData = {
                items: [
                    {
                        id: `test-${Date.now()}`,
                        title: data.title,
                        quantity: 1,
                        unit_price: data.price,
                        description: 'Prueba de integración'
                    }
                ],
                back_urls: {
                    success: `${this.configService.get<string>('APP_URL')}/pagos/success`,
                    failure: `${this.configService.get<string>('APP_URL')}/pagos/failure`,
                    pending: `${this.configService.get<string>('APP_URL')}/pagos/pending`
                }
            };

            const response = await preference.create({
                body: preferenceData
            });

            this.log('Respuesta preferencia simple:', {
                id: response.id,
                init_point: response.init_point
            });

            return {
                id: response.id,
                init_point: response.init_point,
                sandbox_init_point: response.sandbox_init_point
            };
        } catch (error) {
            this.logError('Error al crear preferencia simple:', error.message);
            if (error.cause) {
                this.logError('Detalles del error:', error.cause);
            }
            throw error;
        }
    }

    async createPaymentLink(createPaymentDto: CreatePaymentDto) {
        try {
            const { codCredito, nroCuota } = createPaymentDto;

            this.log(`Buscando vencimiento para crédito: ${codCredito}, cuota: ${nroCuota}`);

            // Buscar información del vencimiento
            const vencimiento = await this.creditoVencimientoRepository.findOne({
                where: {
                    CodCredito: codCredito,
                    NCuota: nroCuota
                }
            });

            if (!vencimiento) {
                this.log(`No se encontró vencimiento para el crédito: ${codCredito}, cuota: ${nroCuota}`);
                throw new Error(`No se encontró el vencimiento especificado para crédito: ${codCredito}, cuota: ${nroCuota}`);
            }

            this.log(`Vencimiento encontrado:`, vencimiento);

            // Buscar información del crédito para complementar datos
            const credito = await this.creditoRepository.findOne({
                where: {
                    CodCredito: codCredito
                }
            });

            if (!credito) {
                this.log(`No se encontró información del crédito: ${codCredito}`);
                throw new Error(`No se encontró el crédito especificado: ${codCredito}`);
            }

            this.log(`Crédito encontrado:`, credito);

            // Crear preferencia de pago en Mercado Pago
            const preference = new Preference(this.client);

            this.log(`Configurando preferencia de pago con token: ${this.accessToken.substring(0, 10)}...`);

            // Verificamos si hay precio válido
            if (!vencimiento.Cuota_Total || isNaN(vencimiento.Cuota_Total)) {
                this.logError(`Error: Monto inválido en cuota_total: ${vencimiento.Cuota_Total}`);
                throw new Error(`El monto de la cuota no es válido: ${vencimiento.Cuota_Total}`);
            }

            // Validación adicional para montos negativos
            if (vencimiento.Cuota_Total <= 0) {
                this.log(`Advertencia: El monto de la cuota es negativo o cero: ${vencimiento.Cuota_Total}. Se usará el valor absoluto.`);
            }

            const appUrl = this.configService.get<string>('APP_URL');
            const apiUrl = this.configService.get<string>('API_URL');

            this.log(`URLs configuradas - APP: ${appUrl}, API: ${apiUrl}`);

            // Configuración de preferencia de pago
            const preferenceData = {
                items: [
                    {
                        id: `${codCredito}-${nroCuota}`,
                        title: `Pago Cuota ${nroCuota} - Crédito ${codCredito}`,
                        quantity: 1,
                        // Aseguramos que el precio sea positivo para Mercado Pago
                        unit_price: Math.abs(Number(vencimiento.Cuota_Total)),
                        description: `Vencimiento: ${vencimiento.Vencimiento.toLocaleDateString()}`
                    }
                ],
                back_urls: {
                    success: `${appUrl}/pagos/success`,
                    failure: `${appUrl}/pagos/failure`,
                    pending: `${appUrl}/pagos/pending`
                },
                // Eliminamos auto_return si está causando problemas
                external_reference: `${codCredito}-${nroCuota}`,
                notification_url: `${apiUrl}/mercado-pago/webhook`
            };

            this.log(`Preferencia configurada:`, preferenceData);

            try {
                const response = await preference.create({
                    body: preferenceData
                });

                this.log(`Respuesta de Mercado Pago:`, {
                    id: response.id,
                    init_point: response.init_point,
                    sandbox_init_point: response.sandbox_init_point
                });

                return {
                    id: response.id,
                    init_point: response.init_point,
                    sandbox_init_point: response.sandbox_init_point
                };
            } catch (mpError) {
                this.logError(`Error de Mercado Pago: ${mpError.message}`);
                if (mpError.cause) {
                    this.logError(`Detalles del error:`, mpError.cause);
                }
                throw new Error(`Error al crear preferencia en Mercado Pago: ${mpError.message}`);
            }
        } catch (error) {
            throw new Error(`Error al crear link de pago: ${error.message}`);
        }
    }

    /**
     * Actualiza el estado de un vencimiento basado en el estado del pago
     */
    async updateVencimientoStatus(
        codCredito: string,
        nroCuota: number,
        status: string,
        status_detail?: string
    ): Promise<boolean> {
        try {
            // Buscar el vencimiento correspondiente
            const vencimiento = await this.creditoVencimientoRepository.findOne({
                where: {
                    CodCredito: codCredito,
                    NCuota: nroCuota
                }
            });

            if (vencimiento) {
                // Actualizar según el estado del pago
                switch (status) {
                    case 'approved':
                        // Pago aprobado
                        vencimiento.Fecha_UltPago = new Date();
                        vencimiento.Estado = 'PAGADO_MP';
                        this.log(`Vencimiento marcado como PAGADO_MP: crédito ${codCredito}, cuota ${nroCuota}`);
                        break;

                    case 'pending':
                        // Pago pendiente
                        vencimiento.Estado = 'PAGO_PENDIENTE_MP';
                        this.log(`Vencimiento marcado como PAGO_PENDIENTE_MP: crédito ${codCredito}, cuota ${nroCuota}`);
                        break;

                    case 'in_process':
                        // Pago en proceso
                        vencimiento.Estado = 'PAGO_EN_PROCESO_MP';
                        this.log(`Vencimiento marcado como PAGO_EN_PROCESO_MP: crédito ${codCredito}, cuota ${nroCuota}`);
                        break;

                    case 'rejected':
                        // Pago rechazado
                        vencimiento.Estado = 'PAGO_RECHAZADO_MP';
                        this.log(`Vencimiento marcado como PAGO_RECHAZADO_MP: crédito ${codCredito}, cuota ${nroCuota}, detalle: ${status_detail}`);
                        break;

                    case 'refunded':
                    case 'cancelled':
                    case 'charged_back':
                        // Pago reembolsado/cancelado/contracargado
                        vencimiento.Estado = 'PAGO_REVERTIDO_MP';
                        this.log(`Vencimiento marcado como PAGO_REVERTIDO_MP: crédito ${codCredito}, cuota ${nroCuota}, estado: ${status}`);
                        break;

                    default:
                        this.log(`Estado de pago no manejado: ${status} para crédito ${codCredito}, cuota ${nroCuota}`);
                        vencimiento.Estado = `PAGO_MP_${status.toUpperCase()}`;
                }

                // Guardar el vencimiento actualizado
                await this.creditoVencimientoRepository.save(vencimiento);

                this.log(`Vencimiento actualizado para crédito ${codCredito}, cuota ${nroCuota}, estado: ${vencimiento.Estado}`);
                return true;
            } else {
                this.logError(`No se encontró el vencimiento para crédito ${codCredito}, cuota ${nroCuota}`);
                return false;
            }
        } catch (error) {
            this.logError(`Error al actualizar vencimiento: ${error.message}`);
            return false;
        }
    }

    /**
     * Procesa directamente la información de un pago sin necesidad de consultar la API de Mercado Pago
     * Útil para simular notificaciones en desarrollo
     */
    async processPaymentNotification(paymentInfo: any) {
        try {
            this.log(`Procesando notificación simulada:`, paymentInfo);

            // Extraer información relevante
            const {
                id,
                status,
                status_detail,
                transaction_amount,
                payment_method_id,
                payment_type_id,
                external_reference
            } = paymentInfo;

            // Parsear la referencia externa para obtener el código de crédito y número de cuota
            let codCredito = null;
            let nroCuota = null;

            if (external_reference && external_reference.includes('-')) {
                const parts = external_reference.split('-');
                codCredito = parts[0];
                nroCuota = parseInt(parts[1]);
            }

            // Guardar la transacción en la base de datos
            const transaccion = new MercadoPagoTransaccion();
            transaccion.payment_id = id ? id.toString() : Math.floor(Math.random() * 10000000000).toString();
            transaccion.preference_id = paymentInfo.preference_id || null;
            transaccion.external_reference = external_reference;
            transaccion.status = status;
            transaccion.status_detail = status_detail || 'simulated';
            transaccion.transaction_amount = transaction_amount || 0;
            transaccion.payment_method_id = payment_method_id || 'simulated';
            transaccion.payment_type_id = payment_type_id || 'simulated';
            transaccion.cod_credito = codCredito;
            transaccion.nro_cuota = nroCuota;
            transaccion.payment_data = JSON.stringify({
                ...paymentInfo,
                _simulated: true,
                _simulation_date: new Date().toISOString()
            });
            transaccion.created_at = new Date();
            transaccion.updated_at = new Date();

            await this.transaccionRepository.save(transaccion);

            // Actualizar el vencimiento según corresponda
            if (codCredito && nroCuota) {
                await this.updateVencimientoStatus(codCredito, nroCuota, status, status_detail);
            }

            return {
                success: true,
                message: 'Notificación simulada procesada correctamente',
                payment_id: transaccion.payment_id,
                status,
                codCredito,
                nroCuota
            };
        } catch (error) {
            this.logError(`Error al procesar notificación simulada: ${error.message}`);
            return {
                success: false,
                message: `Error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    async handleWebhook(body: any, headers?: any) {
        try {
            this.log(`Webhook recibido:`, body);

            // Validar la autenticidad de la notificación si tenemos headers
            if (headers && headers['x-signature']) {
                try {
                    const signature = headers['x-signature'];
                    // Aquí implementarías la validación de la firma
                    // Ejemplo básico (no implementado completamente):
                    // const isValid = this.validateSignature(signature, body);
                    // if (!isValid) {
                    //    this.logError('Firma de webhook inválida');
                    //    return { success: false, message: 'Firma inválida' };
                    // }
                    this.log('Firma de webhook recibida:', signature);
                } catch (signatureError) {
                    this.logError(`Error al validar firma: ${signatureError.message}`);
                    // Continuamos el proceso incluso si hay error de firma en desarrollo
                    if (this.isProduction) {
                        return { success: false, message: 'Error de validación de firma' };
                    }
                }
            }

            // Mercado Pago envía diferentes formatos de notificación
            let paymentId = null;
            let notificationType = '';

            // Identificar el tipo de notificación y obtener el ID de pago
            // Hay varios formatos posibles según la documentación de Mercado Pago
            if (body.action && (body.action === 'payment.created' || body.action === 'payment.updated')) {
                notificationType = 'action';
                paymentId = body.data?.id;
                this.log(`Notificación de tipo action: ${body.action}`);
            } else if (body.type === 'payment') {
                notificationType = 'type';
                paymentId = body.data?.id;
                this.log(`Notificación de tipo payment: ${body.type}`);
            } else if (body.resource && body.topic === 'payment') {
                notificationType = 'resource';
                // Extraer el ID de pago de la URL del recurso
                // Formato esperado: /v1/payments/123456789
                try {
                    const resourceParts = body.resource.split('/');
                    paymentId = resourceParts[resourceParts.length - 1];
                    this.log(`Notificación de tipo resource, ID extraído: ${paymentId}`);
                } catch (error) {
                    this.logError(`Error al extraer ID de la URL del recurso: ${body.resource}`);
                }
            } else if (body.id && body.status) {
                // Este es un formato directo que a veces envía Mercado Pago
                notificationType = 'direct';
                paymentId = body.id;
                this.log(`Notificación directa con ID: ${paymentId}`);
            } else {
                this.log(`Tipo de notificación no soportado o formato desconocido:`, body);
                return {
                    success: false,
                    message: 'Tipo de notificación no soportado o formato desconocido',
                    received: body
                };
            }

            this.log(`Procesando notificación de pago: ${notificationType}, ID: ${paymentId}`);

            if (!paymentId) {
                this.logError(`No se pudo identificar el ID de pago en la notificación`);
                return { success: false, message: 'ID de pago no encontrado' };
            }

            // Obtener detalles del pago desde la API de Mercado Pago
            // con sistema de reintentos
            let paymentInfo;
            let retryCount = 0;
            const maxRetries = 3;

            while (retryCount < maxRetries) {
                try {
                    const payment = new Payment(this.client);
                    paymentInfo = await payment.get({ id: paymentId });
                    this.log(`Información de pago obtenida en intento ${retryCount + 1}`);
                    break; // Si llegamos aquí, salimos del bucle
                } catch (apiError) {
                    retryCount++;
                    this.logError(`Error al obtener información del pago (intento ${retryCount}/${maxRetries}): ${apiError.message}`);

                    if (retryCount >= maxRetries) {
                        throw new Error(`No se pudo obtener información del pago después de ${maxRetries} intentos: ${apiError.message}`);
                    }

                    // Esperar antes del siguiente reintento (espera exponencial)
                    const waitTime = 1000 * Math.pow(2, retryCount - 1); // 1s, 2s, 4s, ...
                    this.log(`Esperando ${waitTime}ms antes del siguiente intento...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                }
            }

            this.log(`Información de pago obtenida:`, paymentInfo);

            // Extraer información relevante
            const {
                id,
                status,
                status_detail,
                transaction_amount,
                payment_method_id,
                payment_type_id,
                external_reference
            } = paymentInfo;

            // Obtener la preferencia de la respuesta completa (podría estar en cualquier parte)
            const preference_id = paymentInfo['preference_id'] ||
                (paymentInfo['additional_info'] ? paymentInfo['additional_info']['preference_id'] : null) ||
                null;

            // Parsear la referencia externa para obtener el código de crédito y número de cuota
            let codCredito = null;
            let nroCuota = null;

            if (external_reference && external_reference.includes('-')) {
                const parts = external_reference.split('-');
                codCredito = parts[0];
                nroCuota = parseInt(parts[1]);
            }

            // Guardar la transacción en la base de datos
            const transaccion = new MercadoPagoTransaccion();
            transaccion.payment_id = id ? id.toString() : paymentId.toString();
            transaccion.preference_id = preference_id ? preference_id.toString() : null;
            transaccion.external_reference = external_reference;
            transaccion.status = status;
            transaccion.status_detail = status_detail;
            transaccion.transaction_amount = transaction_amount;
            transaccion.payment_method_id = payment_method_id;
            transaccion.payment_type_id = payment_type_id;
            transaccion.cod_credito = codCredito;
            transaccion.nro_cuota = nroCuota;
            transaccion.payment_data = JSON.stringify(paymentInfo);
            transaccion.created_at = new Date();
            transaccion.updated_at = new Date();

            await this.transaccionRepository.save(transaccion);

            // Actualizar el vencimiento según corresponda
            if (codCredito && nroCuota) {
                await this.updateVencimientoStatus(codCredito, nroCuota, status, status_detail);
            }

            return {
                success: true,
                message: 'Webhook procesado correctamente',
                payment_id: id,
                status,
                codCredito,
                nroCuota
            };
        } catch (error) {
            this.logError(`Error al procesar webhook: ${error.message}`);
            // En caso de error, devolvemos 200 para que Mercado Pago no reintente
            // pero registramos el error para poder investigarlo
            return {
                success: false,
                message: `Error al procesar webhook: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }
}
