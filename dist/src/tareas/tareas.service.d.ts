import { Usuarios } from 'src/auth/entities/usuarios.entity';
import { Repository } from 'typeorm';
export declare class TareasService {
    private readonly usuariosRepository;
    private readonly logger;
    constructor(usuariosRepository: Repository<Usuarios>);
    sincronizarUsuarios(): Promise<void>;
    ejecutarTareaManual(): Promise<string>;
    private sincronizarUsuariosConFirebase;
    renovarPasswordDesdeCRM(email: string): Promise<string>;
}
