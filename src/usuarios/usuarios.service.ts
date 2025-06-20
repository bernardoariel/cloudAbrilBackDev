import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsuariosService {

 constructor(
  @InjectRepository(Usuario, 'sqlserverConnection')
  private usuariosRepository:Repository<Usuario>
 ){}

 async findAll(){
  return await this.usuariosRepository.find()
 }
}
