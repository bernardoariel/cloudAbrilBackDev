import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Clientes_RecPDet')
export class ClienteRecpdet {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ name: 'CodReciboOf', type: 'varchar', nullable: true })
    codReciboOf: string;

    @Column({ name: 'CodCredito', type: 'varchar', nullable: true })
    codCredito: string;

    @Column({ name: 'NroCuota', type: 'int', nullable: true })
    nroCuota: number;

    @Column({ name: 'MonCuoCap', type: 'decimal', precision: 18, scale: 2, nullable: true })
    monCuoCap: number;

    @Column({ name: 'IntFinCuo', type: 'decimal', precision: 18, scale: 2, nullable: true })
    intFinCuo: number;

    @Column({ name: 'IvaFinCuo', type: 'decimal', precision: 18, scale: 2, nullable: true })
    ivaFinCuo: number;

    @Column({ name: 'IntPunitCuo', type: 'decimal', precision: 18, scale: 2, nullable: true })
    intPunitCuo: number;

    @Column({ name: 'IvaPunitCuo', type: 'decimal', precision: 18, scale: 2, nullable: true })
    ivaPunitCuo: number;

    @Column({ name: 'MonCuoCap_Anul', type: 'decimal', precision: 18, scale: 2, nullable: true })
    monCuoCap_Anul: number;

    @Column({ name: 'IntFinCuo_Anul', type: 'decimal', precision: 18, scale: 2, nullable: true })
    intFinCuo_Anul: number;

    @Column({ name: 'IvaFinCuo_Anul', type: 'decimal', precision: 18, scale: 2, nullable: true })
    ivaFinCuo_Anul: number;

    @Column({ name: 'IntPunitCuo_Anul', type: 'decimal', precision: 18, scale: 2, nullable: true })
    intPunitCuo_Anul: number;

    @Column({ name: 'IvaPunitCuo_Anul', type: 'decimal', precision: 18, scale: 2, nullable: true })
    ivaPunitCuo_Anul: number;

    @Column({ name: 'Bonificacion', type: 'decimal', precision: 18, scale: 2, nullable: true })
    bonificacion: number;

    @Column({ name: 'Desafectacion', type: 'decimal', precision: 18, scale: 2, nullable: true })
    desafectacion: number;

    @Column({ name: 'Mora', type: 'int', nullable: true })
    mora: number;
}
