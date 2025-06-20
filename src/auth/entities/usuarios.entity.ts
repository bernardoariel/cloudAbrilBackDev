import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Usuarios' }) // Nombre de la tabla en SQL Server
export class Usuarios {
  @PrimaryColumn({ name: 'CodUser' })
  codUser: number;

  @Column({ name: 'Usuario' })
  usuario: string;

  @Column({ name: 'PassEmail' })
  PassEmail: string;

  @Column({ name: 'eMail' })
  email: string;

  @Column({ name: 'Nombre' })
  nombre: string;

  @Column({ name: 'Estado' })
  Estado: string;

  // Otros campos según tu tabla...
}
