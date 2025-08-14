
import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 7)
    codCliente: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(7, 8)
    nroDoc: number;
}