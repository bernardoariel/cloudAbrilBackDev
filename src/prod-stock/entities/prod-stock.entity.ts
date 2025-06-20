import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('Prod_Stock')
export class ProdStock {
    @PrimaryColumn()
    CodProducto: string;
  
    @PrimaryColumn()
    CodSucursal: string;
  
    @Column()
    Cantidad: number;
}