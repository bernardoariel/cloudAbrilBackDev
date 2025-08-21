import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientesRecpdetService } from './clientes-recpdet.service';
import { CreateClienteRecpdetDto } from './dto/create-cliente-recpdet.dto';
import { UpdateClienteRecpdetDto } from './dto/update-cliente-recpdet.dto';

@Controller('clientes-recpdet')
export class ClientesRecpdetController {
  constructor(private readonly clientesRecpdetService: ClientesRecpdetService) {}

  @Post()
  create(@Body() createClienteRecpdetDto: CreateClienteRecpdetDto) {
    return this.clientesRecpdetService.create(createClienteRecpdetDto);
  }

  @Get()
  findAll() {
    return this.clientesRecpdetService.findAll();
  }

  @Get('recibo/:codReciboOf')
  findByReciboOf(@Param('codReciboOf') codReciboOf: string) {
    return this.clientesRecpdetService.findByReciboOf(codReciboOf);
  }

  @Get('credito/:codCredito')
  findByCredito(@Param('codCredito') codCredito: string) {
    return this.clientesRecpdetService.findByCredito(codCredito);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesRecpdetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteRecpdetDto: UpdateClienteRecpdetDto) {
    return this.clientesRecpdetService.update(+id, updateClienteRecpdetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesRecpdetService.remove(+id);
  }
}
