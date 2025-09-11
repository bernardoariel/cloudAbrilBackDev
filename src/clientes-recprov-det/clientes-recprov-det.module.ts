import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesRecProvDetController } from './clientes-recprov-det.controller';
import { ClientesRecProvDetService } from './clientes-recprov-det.service';
import { ClienteRecProvDet } from './entities/cliente-recprov-det.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClienteRecProvDet], 'sqlserverConnection'),
    ],
    controllers: [ClientesRecProvDetController],
    providers: [ClientesRecProvDetService],
    exports: [ClientesRecProvDetService],
})
export class ClientesRecProvDetModule { }