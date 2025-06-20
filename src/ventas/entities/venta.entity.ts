import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Clientes_Ventas')
export class Venta {
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
}