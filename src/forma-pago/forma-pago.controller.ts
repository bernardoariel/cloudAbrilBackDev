import { Controller, Get } from '@nestjs/common';
import { FormaPagoService } from './forma-pago.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FormaPago')
@Controller('forma-pago')
export class FormaPagoController {
  constructor(private readonly formaPagoService: FormaPagoService) {}

  @Get()
  async findAll() {
    return await this.formaPagoService.findAll();
  }

}
