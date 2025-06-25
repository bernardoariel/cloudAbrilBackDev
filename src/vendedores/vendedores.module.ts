import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './entities/vendedor.entity';

import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor], 'sqlserverConnection')],
  controllers: [VendedoresController],
  providers: [VendedoresService],
})
export class VendedoresModule {} 