import { ApiProperty } from '@nestjs/swagger';

export class ReciboProvDetDto {
    @ApiProperty({ description: 'Código del recibo provisorio', example: 'REC00001' })
    codReciboPr: string;

    @ApiProperty({ description: 'Número de cuota', example: 1 })
    nroCuota: number;

    @ApiProperty({ description: 'Monto de la cuota', example: 1000.50 })
    montoCuo: number;

    @ApiProperty({ description: 'Interés punitorio', example: 50.25 })
    intPunit: number;
}