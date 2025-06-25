import { Controller, Get, Param } from '@nestjs/common';
import { CobradoresService } from './cobradores.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cobradores')
@Controller('cobradores')
export class CobradoresController {
  constructor(private readonly cobradoresService: CobradoresService) {}

  @Get()
  async findAll() {
    return await this.cobradoresService.findAll();
  }

  @Get(':codCobrador')
  async findOne(@Param('codCobrador') codCobrador: string) {
    return await this.cobradoresService.findOne(codCobrador);
  }
} 