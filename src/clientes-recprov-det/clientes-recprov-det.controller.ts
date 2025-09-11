import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ClientesRecProvDetService } from './clientes-recprov-det.service';
import { ClienteRecProvDet } from './entities/cliente-recprov-det.entity';

@ApiTags('clientes-recprov-det')
@Controller('clientes-recprov-det')
export class ClientesRecProvDetController {
    private readonly logger = new Logger(ClientesRecProvDetController.name);

    constructor(private readonly clientesRecProvDetService: ClientesRecProvDetService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los detalles de recibos provisorios' })
    @ApiResponse({
        status: 200,
        description: 'Lista de detalles de recibos provisorios',
        type: [ClienteRecProvDet],
    })
    findAll(): Promise<ClienteRecProvDet[]> {
        return this.clientesRecProvDetService.findAll();
    }

    @Get(':codReciboPr')
    @ApiOperation({ summary: 'Obtener detalles por código de recibo provisorio' })
    @ApiParam({ name: 'codReciboPr', description: 'Código del recibo provisorio' })
    @ApiResponse({
        status: 200,
        description: 'Detalles del recibo provisorio',
        type: [ClienteRecProvDet],
    })
    findByReciboPr(@Param('codReciboPr') codReciboPr: string): Promise<ClienteRecProvDet[]> {
        return this.clientesRecProvDetService.findByReciboPr(codReciboPr);
    }

    @Get(':codReciboPr/:nroCuota')
    @ApiOperation({ summary: 'Obtener detalle específico de un recibo provisorio' })
    @ApiParam({ name: 'codReciboPr', description: 'Código del recibo provisorio' })
    @ApiParam({ name: 'nroCuota', description: 'Número de cuota' })
    @ApiResponse({
        status: 200,
        description: 'Detalle específico del recibo provisorio',
        type: ClienteRecProvDet,
    })
    findOne(
        @Param('codReciboPr') codReciboPr: string,
        @Param('nroCuota') nroCuota: number,
    ): Promise<ClienteRecProvDet> {
        return this.clientesRecProvDetService.findOne(codReciboPr, nroCuota);
    }
}