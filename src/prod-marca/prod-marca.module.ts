import { Module } from '@nestjs/common';
import { ProdMarcaService } from './prod-marca.service';
import { ProdMarcaController } from './prod-marca.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdMarca } from './entities/prod-marca.entity';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports: [TypeOrmModule.forFeature([ProdMarca], 'sqlserverConnection'),AuthModule  ],
  controllers: [ProdMarcaController],
  providers: [ProdMarcaService],
  exports:[ProdMarcaService]
})
export class ProdMarcaModule {}
