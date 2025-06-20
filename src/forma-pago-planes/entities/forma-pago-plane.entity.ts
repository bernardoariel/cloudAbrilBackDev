import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('FormaPago_Planes')
export class FormaPagoPlanes {
  @PrimaryColumn({ type: 'nvarchar', length: 3 })
  CodForPago: string;

  @PrimaryColumn({ type: 'int' })
  NCuota: number;

  @Column({ type: 'numeric', precision: 7, scale: 4, nullable: true })
  Interes: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  Punitorio: number;

  @Column({ type: 'numeric', precision: 8, scale: 4, nullable: true })
  Coeficiente: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  Puntos: number;
}
