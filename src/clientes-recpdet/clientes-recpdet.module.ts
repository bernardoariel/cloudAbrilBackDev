import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesRecpdetService } from './clientes-recpdet.service';
import { ClientesRecpdetController } from './clientes-recpdet.controller';
import { ClienteRecpdet } from './entities/cliente-recpdet.entity';
import { ClienteCreditoVencimiento } from '../clientes-creditos-vencimientos/entities/cliente-credito-vencimiento.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClienteRecpdet, ClienteCreditoVencimiento], 'sqlserverConnection'),
    ],
    controllers: [ClientesRecpdetController],
    providers: [ClientesRecpdetService],
    exports: [ClientesRecpdetService],
})
export class ClientesRecpdetModule { }
