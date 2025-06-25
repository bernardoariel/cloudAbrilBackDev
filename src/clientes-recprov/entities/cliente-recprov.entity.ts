import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'Clientes_RecProv' })
export class ClienteRecProv {
  @PrimaryColumn({ name: 'CodSucRecibo' })
  codSucRecibo: string;

  @Column({ name: 'CodReciboPr' })
  codReciboPr: string;

  @Column({ name: 'CodCredito' })
  codCredito: string;

  @Column({ name: 'Fecha' })
  fecha: Date;

  @Column({ name: 'MontoPagado' })
  montoPagado: number;

  @Column({ name: 'CodCobrador' })
  codCobrador: string;

  @Column({ name: 'Observacion' })
  observacion: string;

  @Column({ name: 'MAtraso' })
  mAtrazo: number;

  @Column({ name: 'SaldoReal' })
  saldoReal: number;

  @Column({ name: 'Usuario' })
  usuario: string;

  @Column({ name: 'Estado' })
  estado: number;

  @Column({ name: 'FechaImpresion' })
  fechaImpresion: Date;

  @Column({ name: 'Tipo' })
  tipo: number;

  @Column({ name: 'CodAsientoRec' })
  codAsientoRec: string;

  @Column({ name: 'CodForPago' })
  codForPago: string;
} 