import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ClientesRecPagService } from './clientes-recpag.service';

@Controller('clientes-recpag')
export class ClientesRecPagController {
    constructor(private readonly clientesRecPagService: ClientesRecPagService) { }

    @Get()
    findAll() {
        console.log('Obteniendo todos los registros de pagos');
        return this.clientesRecPagService.findAll();
    }

    @Get('credito/:codCredito')
    findByCredito(@Param('codCredito') codCredito: string) {
        console.log(`Buscando crédito con código: ${codCredito}`);
        return this.clientesRecPagService.findByCredito(codCredito);
    }

    @Get('creditos-disponibles')
    findDistinctCreditos() {
        console.log('Obteniendo lista de códigos de crédito disponibles');
        return this.clientesRecPagService.findDistinctCreditos();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientesRecPagService.findOne(+id);
    }
}
