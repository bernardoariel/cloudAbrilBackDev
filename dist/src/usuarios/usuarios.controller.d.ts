import { UsuariosService } from './usuarios.service';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    getAllUsuarios(): Promise<import("./entities/usuario.entity").Usuario[]>;
}
