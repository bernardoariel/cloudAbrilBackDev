import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'Clientes_RecProv' })
export class ClienteRecProv {
  @PrimaryColumn({ name: 'CodSucRecibo', type: 'tinyint' })
  codSucRecibo: number;

  @Column({ name: 'CodReciboPr', type: 'char', length: 8 })
  codReciboPr: string;

  @Column({ name: 'CodCredito', type: 'char', length: 8 })
  codCredito: string;

  @Column({ name: 'Fecha', type: 'smalldatetime' })
  fecha: Date;

  @Column({ name: 'MontoPagado', type: 'numeric', precision: 10, scale: 2 })
  montoPagado: number;

  @Column({ name: 'CodCobrador', type: 'tinyint' })
  codCobrador: number;

  @Column({ name: 'Observacion', type: 'varchar', length: 20 })
  observacion: string;

  @Column({ name: 'MAtraso', type: 'int' })
  mAtrazo: number;

  @Column({ name: 'SaldoReal', type: 'numeric', precision: 10, scale: 2 })
  saldoReal: number;

  @Column({ name: 'Usuario', type: 'varchar', length: 30 })
  usuario: string;

  @Column({ name: 'Estado', type: 'char', length: 1 })
  estado: string;

  @Column({ name: 'FechaImpresion', type: 'smalldatetime' })
  fechaImpresion: Date;

  @Column({ name: 'Tipo', type: 'nvarchar', length: 1 })
  tipo: string;

  @Column({ name: 'CodAsientoRec', type: 'int' })
  codAsientoRec: number;

  @Column({ name: 'CodForPago', type: 'varchar', length: 4 })
  codForPago: string;
} 