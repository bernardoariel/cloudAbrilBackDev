import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdSucursalService } from './prod-sucursal.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('prod-sucursal')
export class ProdSucursalController {
  constructor(private readonly prodSucursalService: ProdSucursalService) {}

  @Get()
  async findAll() {
    return await this.prodSucursalService.findAll()
  }

  @Get(':codSucursal')
  async findOne(@Param('codSucursal') codSucursal: string) {
    return await this.prodSucursalService.findOne(codSucursal);
  }

}
