import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteRecpdetDto } from './create-cliente-recpdet.dto';

export class UpdateClienteRecpdetDto extends PartialType(CreateClienteRecpdetDto) { }
