import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('FormaPago')
export class FormaPago {
  @PrimaryColumn({ type: 'varchar', length: 4 })
  CodForPago: string;

  @Column({ type: 'char', length: 1, nullable: true })
  TipoForma: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  FormaPago: string;

  @Column({ type: 'char', length: 3, nullable: true })
  CodRef: string;
}