import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormaPagoPlanesService } from './forma-pago-planes.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('FormaPago-Planes')
@Controller('forma-pago-planes')
export class FormaPagoPlanesController {
  constructor(private readonly formaPagoPlanesService: FormaPagoPlanesService) {}

  @Get()
 async findAll() {
    return await this.formaPagoPlanesService.findAll();
 }

 @Get(':CodForPago')
  async findOne(@Param('CodForPago') CodForPago: string) {
    return await this.formaPagoPlanesService.findOne(CodForPago);
  }
}
