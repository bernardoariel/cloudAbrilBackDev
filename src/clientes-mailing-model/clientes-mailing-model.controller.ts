import { Controller, Get } from '@nestjs/common';
import { ClientesMailingModelService } from './clientes-mailing-model.service';


@Controller('clientes-mailing-model')
export class ClientesMailingModelController {
  constructor(private readonly clientesMailingModelService: ClientesMailingModelService) {}

  @Get()
  findAll() {
    return this.clientesMailingModelService.findAll();
  }

}
