import { ClienteVentaDetalle } from "src/clientes-ventas-detalle/entities/clientes-ventas-detalle.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('Clientes_Ventas')
export class ClienteVenta {
  @PrimaryColumn()
  CodVenta: number;

  @Column()
  CodSucVenta: number;

  @Column()
  CodCliente: number;

  @Column({ type: 'date' })
  Fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  Total: number;

  @Column()
  FormaPago: string;

  @Column()
  CodVendedor: number;

  @Column()
  Estado: string;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({ name: 'CodCliente', referencedColumnName: 'codCliente' })
  cliente: Cliente;
  
  @OneToMany(() => ClienteVentaDetalle, detalle => detalle.venta)
  detalles: ClienteVentaDetalle[];
  
}