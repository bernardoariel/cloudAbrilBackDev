import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'Clientes_RecPag' })
export class ClienteRecPag {
    @PrimaryColumn({ name: 'CodSucRecibo', type: 'int' })
    codSucRecibo: number;

    @Column({ name: 'Tipo', type: 'varchar', length: 2, nullable: true })
    tipo: string;

    @Column({ name: 'CodReciboOf', type: 'char', length: 8, nullable: true })
    codReciboOf: string;

    @Column({ name: 'CodCredito', type: 'char', length: 8, nullable: true })
    codCredito: string;

    @Column({ name: 'Fecha', type: 'smalldatetime', nullable: true })
    fecha: Date;

    @Column({ name: 'MontoPagado', type: 'numeric', precision: 18, scale: 2, nullable: true })
    montoPagado: number;

    @Column({ name: 'CapAcred', type: 'numeric', precision: 18, scale: 2, nullable: true })
    capAcred: number;

    @Column({ name: 'InterFinan', type: 'numeric', precision: 18, scale: 2, nullable: true })
    interFinan: number;

    @Column({ name: 'IvaIntFinan', type: 'numeric', precision: 18, scale: 2, nullable: true })
    ivaIntFinan: number;

    @Column({ name: 'Punitorios', type: 'numeric', precision: 18, scale: 2, nullable: true })
    punitorios: number;

    @Column({ name: 'IvaPunit', type: 'numeric', precision: 18, scale: 2, nullable: true })
    ivaPunit: number;

    @Column({ name: 'CodRecProv', type: 'char', length: 8, nullable: true })
    codRecProv: string;

    @Column({ name: 'CodCobrador', type: 'tinyint', nullable: true })
    codCobrador: number;

    @Column({ name: 'Observacion', type: 'varchar', length: 30, nullable: true })
    observacion: string;

    @Column({ name: 'Usuario', type: 'varchar', length: 30, nullable: true })
    usuario: string;

    @Column({ name: 'Id_Operador', type: 'int', nullable: true })
    idOperador: number;

    @Column({ name: 'Estado', type: 'char', length: 1, nullable: true })
    estado: string;

    @Column({ name: 'FechaCarga', type: 'smalldatetime', nullable: true })
    fechaCarga: Date;

    @Column({ name: 'ForPago', type: 'varchar', length: 4, nullable: true })
    forPago: string;

    @Column({ name: 'CodMovFondo', type: 'int', nullable: true })
    codMovFondo: number;

    @Column({ name: 'CodSucFondo', type: 'int', nullable: true })
    codSucFondo: number;

    @Column({ name: 'NroRecibo', type: 'nvarchar', length: 13, nullable: true })
    nroRecibo: string;

    @Column({ name: 'NroFactura', type: 'nvarchar', length: 13, nullable: true })
    nroFactura: string;

    @Column({ name: 'EnCaja', type: 'bit', nullable: true })
    enCaja: boolean;

    @Column({ name: 'Mora', type: 'int', nullable: true })
    mora: number;
}
