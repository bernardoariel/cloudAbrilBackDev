import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty({
        description: 'Código del crédito',
        example: '03009300',
    })
    @IsNotEmpty()
    @IsString()
    codCredito: string;

    @ApiProperty({
        description: 'Número de cuota a pagar',
        example: 9,
    })
    @IsNotEmpty()
    @IsNumber()
    nroCuota: number;
}
