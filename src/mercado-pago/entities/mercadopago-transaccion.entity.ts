import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('MercadoPago_Transacciones')
export class MercadoPagoTransaccion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    payment_id: string;

    @Column({ nullable: true })
    preference_id: string;

    @Column({ nullable: true })
    external_reference: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    status_detail: string;

    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    transaction_amount: number;

    @Column({ nullable: true })
    payment_method_id: string;

    @Column({ nullable: true })
    payment_type_id: string;

    @Column({ nullable: true })
    cod_credito: string;

    @Column({ nullable: true })
    nro_cuota: number;

    @Column({ type: 'nvarchar', length: 'max', nullable: true })
    payment_data: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    updated_at: Date;
}
