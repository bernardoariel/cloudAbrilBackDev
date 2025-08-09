import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesRecPagService } from './clientes-recpag.service';
import { ClientesRecPagController } from './clientes-recpag.controller';
import { ClienteRecPag } from './entities/cliente-recpag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClienteRecPag], 'sqlserverConnection')],
    controllers: [ClientesRecPagController],
    providers: [ClientesRecPagService],
})
export class ClientesRecPagModule { }
