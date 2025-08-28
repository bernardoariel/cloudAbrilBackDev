import { IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltrosCreditosVencidosDto {
    @IsOptional()
    @IsDateString()
    fechaDesde?: string;

    @IsOptional()
    @IsDateString()
    fechaHasta?: string;
}
