import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Between, Repository } from 'typeorm';
import { ClienteVenta } from './entities/cliente-venta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { ManyToOne, JoinColumn } from 'typeorm';


@Injectable()
export class ClientesVentasService {
  constructor(
    @InjectRepository(ClienteVenta,'sqlserverConnection')
    private ClientesVentasRepository: Repository<ClienteVenta>,
  ){}
  
  async findAll() {
    return this.ClientesVentasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  async findByFecha(desde: Date, hasta: Date): Promise<ClienteVenta[]> {
    return this.ClientesVentasRepository.find({
      where: {
        Fecha: Between(desde, hasta),
      },
      order: {
        Fecha: 'ASC',
      },
    });
  }
   async findByFechaConCliente(desde: Date, hasta: Date) {
    const fechaDesde = new Date(desde);
    fechaDesde.setHours(0, 0, 0, 0);

    const fechaHasta = new Date(hasta);
    fechaHasta.setHours(23, 59, 59, 999);

    return this.ClientesVentasRepository
      .createQueryBuilder('venta')
      .innerJoin('Clientes_Per', 'cliente', 'venta.CodCliente = cliente.CodCliente')
      .leftJoin(
        qb => qb
          .select('c.CodCliente, c.NombreCont, c.ApellidoCont, c.Caracteristica, c.Numero')
          .from('Clientes_Contactos', 'c')
          .where("c.EsPrincipal = 'S'"),
        'contacto',
        'venta.CodCliente = contacto.CodCliente'
      )
      .where('venta.Fecha BETWEEN :desde AND :hasta', { desde: fechaDesde, hasta: fechaHasta })
      .select([
        'venta.CodVenta',
        'venta.Fecha',
        'venta.Total',
        'venta.FormaPago',
        'venta.CodVendedor',
        'venta.CodCliente',
        'cliente.Nombre',
        'cliente.CodSucursal',
        'cliente.NroDoc',
        'contacto.NombreCont',
        'contacto.ApellidoCont',
        "CONCAT(contacto.Caracteristica, contacto.Numero) as Telefonos",
      ])
      .orderBy('venta.Fecha', 'ASC')
      .getRawMany();
  }
  async findVentaCompleta(codVenta: number) {
  const venta = await this.ClientesVentasRepository.findOne({
    where: { CodVenta: codVenta },
    relations: ['cliente', 'detalles', 'detalles.producto'],
  });

  if (!venta) return null;

  return {
    CodVenta: venta.CodVenta,
    Fecha: venta.Fecha,
    Total: venta.Total,
    FormaPago: venta.FormaPago?.trim(),
    Estado: venta.Estado,
    cliente: {
      codCliente: venta.cliente?.codCliente,
      nombre: venta.cliente?.nombre,
      nroDoc: venta.cliente?.nroDoc,
      telefonos: venta.cliente?.telefonos,
    },
    detalles: venta.detalles.map(d => ({
      CodProducto: d.CodProducto,
      NombreProducto: d.producto?.Producto,
      Cantidad: d.Cantidad,
      PrecioUnit: d.PrecioUnit,
      Subtotal: Number(d.Cantidad) * Number(d.PrecioUnit),
    })),
  };
}


}
