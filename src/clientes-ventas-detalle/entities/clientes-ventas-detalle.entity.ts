import { ClienteVenta } from 'src/clientes-ventas/entities/cliente-venta.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('Clientes_VenDet')
export class ClienteVentaDetalle {
  @PrimaryColumn()
  CodVenta: number;

  @PrimaryColumn()
  CodProducto: number;

  @Column()
  CodColor: number;

  @Column('int')
  Cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  PrecioUnit: number;


  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Serie: string;

  @Column({ type: 'char', length: 1 })
  Estado: string;

  @Column('decimal', { precision: 5, scale: 2 })
  IVA: number;


  @Column({ type: 'bit', nullable: true })
  EnService: boolean;

  @Column({ type: 'bit' })
  Entrega: boolean;

  @Column({ type: 'date', nullable: true })
  FecEntrega: Date;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  ProdCombo: string;

  @ManyToOne(() => ClienteVenta, venta => venta.detalles)
  @JoinColumn({ name: 'CodVenta', referencedColumnName: 'CodVenta' })
  venta: ClienteVenta;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'CodProducto', referencedColumnName: 'CodProducto' })
  producto: Producto;
}
