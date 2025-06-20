import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProdCostosService } from './prod-costos.service';
import { ProdCostos } from './entities/prod-costo.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('prod-costos')
export class ProdCostosController {
  constructor(private readonly prodCostosService: ProdCostosService) {}
  @Get(':codProducto')
  async findByCodProducto(@Param('codProducto') codProducto: string): Promise<ProdCostos> {
    const prodCostos = await this.prodCostosService.findByCodProducto(codProducto);
    if (!prodCostos) {
      throw new NotFoundException('Costos para el producto no encontrados');
    }
    return prodCostos;
  }
 
}
