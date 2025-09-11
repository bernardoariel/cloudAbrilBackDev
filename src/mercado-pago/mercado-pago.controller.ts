import { Body, Controller, Post, Headers, HttpCode, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MercadoPagoService } from './mercado-pago.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentResponseDto } from './dto/payment-response.dto';

@ApiTags('mercado-pago')
@Controller('mercado-pago')
export class MercadoPagoController {
    constructor(private readonly mercadoPagoService: MercadoPagoService) { }

    @Post('crear-pago')
    @ApiOperation({ summary: 'Crear link de pago para una cuota de crédito' })
    @ApiResponse({
        status: 201,
        description: 'Link de pago creado exitosamente',
        type: PaymentResponseDto
    })
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        return await this.mercadoPagoService.createPaymentLink(createPaymentDto);
    }

    @Post('webhook')
    @HttpCode(200)
    @ApiOperation({ summary: 'Endpoint para recibir notificaciones de Mercado Pago' })
    async handleWebhook(@Body() body: any, @Headers() headers: any) {
        // Pasamos también los headers para validar la autenticidad de la notificación
        return await this.mercadoPagoService.handleWebhook(body, headers);
    }

    @Get('health')
    @ApiOperation({ summary: 'Verificar disponibilidad del servicio de pagos' })
    healthCheck() {
        return { status: 'ok', service: 'mercado-pago' };
    }

    @Get('generar-pago/:codCredito/:nroCuota')
    @ApiOperation({ summary: 'Crear un link de pago para un crédito y cuota específicos' })
    async createPaymentByParams(
        @Param('codCredito') codCredito: string,
        @Param('nroCuota') nroCuota: number
    ) {
        const paymentRequest: CreatePaymentDto = {
            codCredito,
            nroCuota: Number(nroCuota)
        };
        return await this.mercadoPagoService.createPaymentLink(paymentRequest);
    }

    @Get('pago-simple/:precio?')
    @ApiOperation({ summary: 'Crear un link de pago simple con valor fijo o personalizado (sin DB)' })
    async createSimplePayment(@Param('precio') precio?: number) {
        try {
            const valorPago = precio ? Number(precio) : 100;
            const preference = await this.mercadoPagoService.createSimplePreference({
                title: `Pago por $${valorPago}`,
                price: valorPago
            });
            return preference;
        } catch (error) {
            return {
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    @Post('simular-webhook')
    @HttpCode(200)
    @ApiOperation({ summary: 'Endpoint para simular notificaciones de Mercado Pago en desarrollo' })
    async simulateWebhook(@Body() body: any) {
        try {
            // Si no se proporciona un cuerpo, crear uno de ejemplo
            if (!body || Object.keys(body).length === 0) {
                const paymentId = Math.floor(Math.random() * 10000000000);
                body = {
                    action: 'payment.created',
                    data: {
                        id: paymentId.toString()
                    }
                };
            }

            // Procesar la notificación simulada
            return await this.mercadoPagoService.handleWebhook(body);
        } catch (error) {
            return {
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    @Get('simular-notificacion/:codCredito/:nroCuota/:status')
    @ApiOperation({ summary: 'Simular una notificación de pago para un crédito y cuota específicos' })
    async simulateNotification(
        @Param('codCredito') codCredito: string,
        @Param('nroCuota') nroCuota: number,
        @Param('status') status: string
    ) {
        try {
            // Crear un ID de pago simulado
            const paymentId = Math.floor(Math.random() * 10000000000);

            // Crear datos de pago simulados
            const paymentData = {
                id: paymentId,
                status: status || 'approved',
                status_detail: 'accredited',
                transaction_amount: 1000,
                payment_method_id: 'visa',
                payment_type_id: 'credit_card',
                external_reference: `${codCredito}-${nroCuota}`
            };

            // Simular el proceso de webhook completo
            return await this.mercadoPagoService.processPaymentNotification(paymentData);
        } catch (error) {
            return {
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
}
