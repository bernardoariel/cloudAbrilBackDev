import { PartialType } from '@nestjs/swagger';
import { CreateClientesMailingModelDto } from './create-clientes-mailing-model.dto';

export class UpdateClientesMailingModelDto extends PartialType(CreateClientesMailingModelDto) {}
