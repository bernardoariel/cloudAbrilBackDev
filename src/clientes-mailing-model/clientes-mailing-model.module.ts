import { Module } from '@nestjs/common';
import { ClientesMailingModelService } from './clientes-mailing-model.service';
import { ClientesMailingModelController } from './clientes-mailing-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesMailingModel } from './entities/clientes-mailing-model.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([ClientesMailingModel], 'sqlserverConnection'), // Aquí registras la entidad
    ],
  controllers: [ClientesMailingModelController],
  providers: [ClientesMailingModelService],
})
export class ClientesMailingModelModule {}
