import { Injectable } from '@nestjs/common';
import { CreateClientesVentasDetalleDto } from './dto/create-clientes-ventas-detalle.dto';
import { UpdateClientesVentasDetalleDto } from './dto/update-clientes-ventas-detalle.dto';

@Injectable()
export class ClientesVentasDetalleService {
  create(createClientesVentasDetalleDto: CreateClientesVentasDetalleDto) {
    return 'This action adds a new clientesVentasDetalle';
  }

  findAll() {
    return `This action returns all clientesVentasDetalle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientesVentasDetalle`;
  }

  update(id: number, updateClientesVentasDetalleDto: UpdateClientesVentasDetalleDto) {
    return `This action updates a #${id} clientesVentasDetalle`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientesVentasDetalle`;
  }
}
