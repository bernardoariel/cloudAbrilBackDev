import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Clientes_Creditos')
export class ClienteCredito {
  @PrimaryColumn()
  CodSucCred: number;

  @PrimaryColumn({ type: 'varchar' })
  CodCredito: string;

  @Column()
  CodCliente: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  CodVenta: string;

  @Column({ type: 'datetime', nullable: true })
  Fecha: Date;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  MontoCapital: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  SaldoCapital: number;

  @Column({ type: 'int', nullable: true })
  CantCuotas: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  CuotaCapital: number;

  @Column({ type: 'decimal', precision: 18, scale: 4, nullable: true })
  TasaIntMen: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  IntMenCuota: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  GastosAdm: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  IntPunitorio: number;

  @Column({ type: 'datetime', nullable: true })
  FechaPPago: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Observacion: string;

  @Column({ type: 'char', length: 1, nullable: true })
  EmitiRecibo: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Estado: string;

  @Column({ type: 'int', nullable: true })
  CodCobrador: number;

  @Column({ type: 'int', nullable: true })
  CodGarante: number;

  @Column({ type: 'char', length: 1, nullable: true })
  InformeCom: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Afectado: string;

  @Column({ type: 'datetime', nullable: true })
  FechaAfect: Date;

  @Column({ type: 'datetime', nullable: true })
  FecPagare: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  PagEntregadoA: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Auditar: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Mora: string;

  @Column({ type: 'char', length: 1, nullable: true })
  ProMora: string;

  @Column({ type: 'char', length: 1, nullable: true })
  ControlF: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  DocGarante: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Refinancio: string;

  @Column({ type: 'int', nullable: true })
  CreditoRef: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  MotivoRef: string;

  @Column({ type: 'int', nullable: true })
  SucAnterior: number;

  @Column({ type: 'int', nullable: true })
  CodGarante2: number;

  @Column({ type: 'char', length: 1, nullable: true })
  CreditoObservado: string;

  @Column({ type: 'char', length: 1, nullable: true })
  CreditoControlado: string;

  @Column({ type: 'char', length: 1, nullable: true })
  CreditoRecibido: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Comentarios: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Intereses: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  IVAIntereses: number;

  @Column({ type: 'char', length: 1, nullable: true })
  Autor_Inmediata: string;

  @Column({ type: 'datetime', nullable: true })
  Hora: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Credito_Origen: string;

  @Column({ type: 'int', nullable: true })
  CodComercio: number;

  @Column({ type: 'char', length: 1, nullable: true })
  CreditoPresentado: string;

  @Column({ type: 'char', length: 1, nullable: true })
  CreditoLiquidado: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  Comision_Comercio: number;

  @Column({ type: 'char', length: 1, nullable: true })
  EstadoCredito: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  AutorizacionExt: string;

  @Column({ type: 'char', length: 1, nullable: true })
  ESTADO_ANT: string;
} 