import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Clientes_MetPagos')
export class ClienteMetPago {
  @PrimaryColumn()
  CodSucursal: number;

  @PrimaryColumn()
  CodMetPagos: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  CodVenta: string;

  @Column({ type: 'int', nullable: true })
  CodForPago: number;

  @Column({ type: 'char', length: 1, nullable: true })
  Estado: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Tipo: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Importe: number;

  @Column({ type: 'int', nullable: true })
  CodSucFondo: number;

  @Column({ type: 'int', nullable: true })
  CodMovFondo: number;

  @Column({ type: 'int', nullable: true })
  Id_Operador: number;

  @Column({ type: 'int', nullable: true })
  Id_Registro: number;

  @Column({ type: 'int', nullable: true })
  Id_Turno: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Capital: number;

  @Column({ type: 'int', nullable: true })
  Id_Ejercicio: number;
} 