import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuariosRepository;
    private readonly jwtService;
    constructor(usuariosRepository: Repository<Usuarios>, jwtService: JwtService);
    loginUser(email: string, password: string): Promise<any>;
    logoutUser(): Promise<void>;
    refreshToken(refreshToken: string): Promise<any>;
}
