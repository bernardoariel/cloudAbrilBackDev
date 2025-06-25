import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'Vendedores' })
export class Vendedor {
  @PrimaryColumn({ name: 'CodVendedor' })
  codVendedor: string;

  @Column({ name: 'Nombre' })
  nombre: string;

  @Column({ name: 'Domicilio' })
  domicilio: string;

  @Column({ name: 'CodBarrio' })
  codBarrio: number;

  @Column({ name: 'CodLocalidad' })
  codLocalidad: number;

  @Column({ name: 'CodProvincia' })
  codProvincia: number;

  @Column({ name: 'Telefonos' })
  telefonos: string;

  @Column({ name: 'CodSucursal' })
  codSucursal: number;

  @Column({ name: 'Comision' })
  comision: number;

  @Column({ name: 'Observacion' })
  observacion: string;

  @Column({ name: 'Estado' })
  estado: number;
} 