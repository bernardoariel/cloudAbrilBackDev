import { Module } from '@nestjs/common';
import { ProdSucursalService } from './prod-sucursal.service';
import { ProdSucursalController } from './prod-sucursal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sucursal } from './entities/prod-sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal], 'sqlserverConnection')],
  providers: [ProdSucursalService],
  controllers: [ProdSucursalController],
  exports: [ProdSucursalService],
})
export class ProdSucursalModule {}
