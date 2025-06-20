import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
export declare class UsuariosService {
    private usuariosRepository;
    constructor(usuariosRepository: Repository<Usuario>);
    findAll(): Promise<Usuario[]>;
}
