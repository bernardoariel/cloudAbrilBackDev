import { Controller, Get, Param } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vendedores')
@Controller('vendedores')
export class VendedoresController {
  constructor(private readonly vendedoresService: VendedoresService) {}

  @Get()
  async findAll() {
    return await this.vendedoresService.findAll();
  }

  @Get(':codVendedor')
  async findOne(@Param('codVendedor') codVendedor: string) {
    return await this.vendedoresService.findOne(codVendedor);
  }
} 