import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<any>;
    logout(): Promise<void>;
    refresh(refreshDto: {
        refreshToken: string;
    }): Promise<any>;
}
