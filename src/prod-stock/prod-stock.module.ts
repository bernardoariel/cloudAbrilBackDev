import { Module } from '@nestjs/common';
import { ProdStockService } from './prod-stock.service';
import { ProdStockController } from './prod-stock.controller';
import { ProdStock } from './entities/prod-stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdStock], 'sqlserverConnection'), // Asegúrate de registrar la entidad aquí
  ],
  controllers: [ProdStockController],
  providers: [ProdStockService],
  exports: [ProdStockService],
})
export class ProdStockModule {}
