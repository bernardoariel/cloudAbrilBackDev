import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Clientes_Per')
export class LoginCliente {
    @PrimaryColumn({ name: 'CodCliente', type: 'varchar', length: 7 })
    codCliente: string;

    @Column({ name: 'NroDoc', type: 'int' })
    nroDoc: number;

}
