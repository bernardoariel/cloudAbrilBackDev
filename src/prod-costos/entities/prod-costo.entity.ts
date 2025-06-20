import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Prod_Costos')
export class ProdCostos {
  @PrimaryGeneratedColumn()
  idProdCosto: number;

  @Column({ type: 'varchar', length: 255 })
  CodProducto: string;

  
  @Column({ type: 'decimal', nullable: true })
  Precio: number;

}