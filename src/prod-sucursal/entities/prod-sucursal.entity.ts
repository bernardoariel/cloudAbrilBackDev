import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Sucursales')
export class Sucursal {
  @PrimaryColumn()
  CodSucursal: string;

  @Column()
  NombreSuc: string;
}
