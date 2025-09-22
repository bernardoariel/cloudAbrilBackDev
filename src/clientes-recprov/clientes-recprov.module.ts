import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRecProv } from './entities/cliente-recprov.entity';
import { ClientesRecProvService } from './clientes-recprov.service';
import { ClientesRecProvController } from './clientes-recprov.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteRecProv], 'sqlserverConnection')],
  providers: [ClientesRecProvService],
  controllers: [ClientesRecProvController],
  exports: [ClientesRecProvService], // Exportamos el servicio para que pueda ser usado en otros módulos
})
export class ClientesRecProvModule { } 