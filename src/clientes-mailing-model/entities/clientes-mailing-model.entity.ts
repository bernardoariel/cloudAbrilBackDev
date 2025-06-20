// clientes-mailing-model.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clientes_MailingModel')
export class ClientesMailingModel {
  @PrimaryGeneratedColumn()
  NModelo: number;

  @Column({ nullable: true })
  Detalle: string;

  @Column({ type: 'text', nullable: true })
  Modelo: string;

  @Column({ type: 'text', nullable: true })
  Firma: string;

/*   @Column({ type: 'varbinary', nullable: true })
Imagen: Buffer;
 */
  @Column({ type: 'text', nullable: true })
  Pie: string;

  @Column({ nullable: true })
  Tipo: number;
}
