import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Clientes_Per')
export class Cliente {
  @PrimaryColumn({ name: 'CodCliente', type: 'varchar', length: 7 })
  codCliente: string;

  @Column({ name: 'CodSucursal', type: 'int' })
  codSucursal: number;

  @Column({ name: 'Nombre', type: 'nvarchar', length: 60 })
  nombre: string;

  @Column({ name: 'NroDoc', type: 'int' })
  nroDoc: number;

  @Column({ name: 'Cuit', type: 'nvarchar', length: 13 })
  cuit: string;

  @Column({ name: 'Prefijo', type: 'nvarchar', length: 5, nullable: true })
  prefijo: string;

  @Column({ name: 'Telefonos', type: 'varchar', length: 70, nullable: true })
  telefonos: string;
}
