import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
    @ApiProperty({
        description: 'Identificador de la preferencia de pago',
        example: '123456789',
    })
    id: string;

    @ApiProperty({
        description: 'URL para iniciar el pago',
        example: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=123456789',
    })
    init_point: string;

    @ApiProperty({
        description: 'URL para sandbox (ambiente de pruebas)',
        example: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=123456789',
    })
    sandbox_init_point: string;
}
