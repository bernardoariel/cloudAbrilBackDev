import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Clientes_Contactos')
export class ClienteContacto {
  @PrimaryGeneratedColumn()
  IdClienteContacto: number;

  @Column()
  CodSucursal: number;

  @Column()
  CodCliente: number;

  @Column()
  CodTipoContacto: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Caracteristica: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Numero: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Interno: string;

  @Column({ type: 'char', length: 1, nullable: true })
  EsPrincipal: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Email: string;

  @Column({ type: 'char', length: 1, nullable: true })
  envia_sms: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  NombreCont: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ApellidoCont: string;

  @Column({ type: 'char', length: 1, nullable: true })
  PresentaFactura: string;

  @Column({ type: 'char', length: 1, nullable: true })
  Estado: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Usr_Alta: string;

  @Column({ type: 'datetime', nullable: true })
  Fecha_Alta: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Usr_Mod: string;

  @Column({ type: 'datetime', nullable: true })
  Fecha_Mod: Date;

  @Column({ type: 'int', nullable: true })
  ID_SOLICITUD_CONTACTOS: number;

  @Column({ type: 'bit', nullable: true })
  TelefonoVerificado: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  NombreTelefono: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  DomicilioTelefono: string;
} 