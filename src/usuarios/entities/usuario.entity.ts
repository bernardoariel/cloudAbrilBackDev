import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Usuarios')
export class Usuario {
    @PrimaryColumn({name:'CodUser'})
    CodUser:number;

    @Column({name:'Usuario'})
    Usuario: string;

    @Column({name:'Descripcion'})
    Descripcion:string;

    @Column({name:'Estado'})
    Estado: string;

    @Column({name:'eMail'})
    eMail:string;

    @Column({name:'CodEmpleado'})
    CodEmpleado:number;

    @Column({name:'CodSucursal'})
    CodSucursal:number;

}
