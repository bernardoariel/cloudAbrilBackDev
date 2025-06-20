import { Module } from '@nestjs/common';
import { FormaPagoPlanesService } from './forma-pago-planes.service';
import { FormaPagoPlanesController } from './forma-pago-planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPagoPlanes } from './entities/forma-pago-plane.entity';
import { FormaPagoModule } from 'src/forma-pago/forma-pago.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormaPagoPlanes], 'sqlserverConnection'),
    FormaPagoModule
  ],
  controllers: [FormaPagoPlanesController],
  providers: [FormaPagoPlanesService],
  exports:[FormaPagoPlanesService]
})
export class FormaPagoPlanesModule {}
