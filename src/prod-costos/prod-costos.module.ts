import { Module } from '@nestjs/common';
import { ProdCostosService } from './prod-costos.service';
import { ProdCostosController } from './prod-costos.controller';
import { ProdCostos } from './entities/prod-costo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProdCostos], 'sqlserverConnection')], 
  controllers: [ProdCostosController],
  providers: [ProdCostosService],
  exports: [ProdCostosService], 
})
export class ProdCostosModule {}
