import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clientes_Creditos_Vencimientos')
export class ClienteCreditoVencimiento {
  @PrimaryGeneratedColumn()
  idVencimiento: number;

  @Column()
  CodSucursal: number;

  @Column()
  CodCredito: string;

  @Column()
  NCuota: number;

  @Column('decimal', { precision: 18, scale: 2 })
  Cuota_Capital: number;

  @Column('decimal', { precision: 18, scale: 2 })
  Cuota_Interes: number;

  @Column('decimal', { precision: 18, scale: 2 })
  Ajuste: number;

  @Column('decimal', { precision: 18, scale: 2 })
  Cuota_Total: number;

  @Column('datetime')
  Vencimiento: Date;

  @Column('datetime', { nullable: true })
  Fecha_UltPago: Date;

  @Column({ nullable: true })
  User_Alta: string;

  @Column('decimal', { precision: 18, scale: 2, nullable: true })
  Mora: number;

  @Column({ nullable: true })
  Estado: string;

  @Column({ nullable: true })
  NCheque: string;

  @Column({ nullable: true })
  Librador: string;
} 