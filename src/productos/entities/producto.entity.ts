import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Productos')
export class Producto {
 
  @PrimaryColumn()
  CodProducto: string; 

  @Column()
  Producto: string;

  @Column()
  Medida: string;

  @Column()
  Descripcion: string;

  @Column()
  Stock: number;
  
  @Column()
  CodMarca: number;

  @Column()
  CodRubro: number;

  @Column()
  CodCategoria: number;

}
