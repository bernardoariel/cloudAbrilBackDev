import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdCostosModule } from 'src/prod-costos/prod-costos.module';
import { ProdImageService } from 'src/prod-image/prod-image.service';
import { ProdImageModule } from 'src/prod-image/prod-image.module';
import { ProdStockModule } from 'src/prod-stock/prod-stock.module';
import { ProdMarcaModule } from 'src/prod-marca/prod-marca.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto],'sqlserverConnection'),
    ProdCostosModule,
    ProdImageModule,
    ProdStockModule,
    ProdMarcaModule
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
