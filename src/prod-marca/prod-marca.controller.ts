import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProdMarcaService } from './prod-marca.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@ApiTags('Abril-SqlServer')
@Controller('prod-marca')
export class ProdMarcaController {
  constructor(private readonly prodMarcaService: ProdMarcaService) {}

/*   @UseGuards(JwtAuthGuard) */
  @Get()
  findAll() {
    return this.prodMarcaService.findAll();
  }

  @Get(':CodMarca')
  findOne(@Param('CodMarca') CodMarca: string) {
    return this.prodMarcaService.findOne(+CodMarca);
  }
}
