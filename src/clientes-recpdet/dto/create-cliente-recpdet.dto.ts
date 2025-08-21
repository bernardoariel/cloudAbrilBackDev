import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClienteRecpdetDto {
    @IsOptional()
    @IsString()
    codReciboOf?: string;

    @IsOptional()
    @IsString()
    codCredito?: string;

    @IsOptional()
    @IsNumber()
    nroCuota?: number;

    @IsOptional()
    @IsNumber()
    monCuoCap?: number;

    @IsOptional()
    @IsNumber()
    intFinCuo?: number;

    @IsOptional()
    @IsNumber()
    ivaFinCuo?: number;

    @IsOptional()
    @IsNumber()
    intPunitCuo?: number;

    @IsOptional()
    @IsNumber()
    ivaPunitCuo?: number;

    @IsOptional()
    @IsNumber()
    monCuoCap_Anul?: number;

    @IsOptional()
    @IsNumber()
    intFinCuo_Anul?: number;

    @IsOptional()
    @IsNumber()
    ivaFinCuo_Anul?: number;

    @IsOptional()
    @IsNumber()
    intPunitCuo_Anul?: number;

    @IsOptional()
    @IsNumber()
    ivaPunitCuo_Anul?: number;

    @IsOptional()
    @IsNumber()
    bonificacion?: number;

    @IsOptional()
    @IsNumber()
    desafectacion?: number;

    @IsOptional()
    @IsNumber()
    mora?: number;
}
