import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesRecpdetService } from './clientes-recpdet.service';
import { ClientesRecpdetController } from './clientes-recpdet.controller';
import { ClienteRecpdet } from './entities/cliente-recpdet.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClienteRecpdet], 'sqlserverConnection'),
    ],
    controllers: [ClientesRecpdetController],
    providers: [ClientesRecpdetService],
    exports: [ClientesRecpdetService],
})
export class ClientesRecpdetModule { }
