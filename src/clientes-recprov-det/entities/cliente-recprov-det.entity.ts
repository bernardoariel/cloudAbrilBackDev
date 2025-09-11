import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Clientes_RecProvDet')
export class ClienteRecProvDet {
    @PrimaryColumn({ name: 'CodReciboPr', type: 'char', length: 8 })
    codReciboPr: string;

    @PrimaryColumn({ name: 'NroCuota', type: 'int' })
    nroCuota: number;

    @Column({ name: 'MontoCuo', type: 'decimal', precision: 10, scale: 2 })
    montoCuo: number;

    @Column({ name: 'IntPunit', type: 'decimal', precision: 10, scale: 2 })
    intPunit: number;
}