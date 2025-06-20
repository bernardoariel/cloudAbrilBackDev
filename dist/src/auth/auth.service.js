"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("firebase/auth");
const firebase_config_1 = require("../../firebase-config");
const typeorm_1 = require("@nestjs/typeorm");
const usuarios_entity_1 = require("./entities/usuarios.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usuariosRepository, jwtService) {
        this.usuariosRepository = usuariosRepository;
        this.jwtService = jwtService;
    }
    async loginUser(email, password) {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { email },
            });
            if (!usuario || usuario.PassEmail !== password) {
                throw new common_1.HttpException('El usuario o la contraseña son incorrectos.', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (usuario.Estado !== 'A') {
                throw new common_1.HttpException('El usuario no está activo en el sistema.', common_1.HttpStatus.FORBIDDEN);
            }
            const userCredential = await (0, auth_1.signInWithEmailAndPassword)(firebase_config_1.auth, email, password);
            const firebaseUser = userCredential.user;
            const payload = { email: usuario.email, sub: usuario.codUser };
            const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '2h' });
            return {
                message: "Login exitoso.",
                user: firebaseUser,
                accessToken,
                refreshToken
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            console.error("Error durante el login:", error);
            throw new common_1.HttpException('Error interno del servidor. Por favor, intenta nuevamente más tarde.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logoutUser() {
        try {
            await (0, auth_1.signOut)(firebase_config_1.auth);
            console.log("Sesión cerrada correctamente.");
        }
        catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw new Error('Error al cerrar sesión');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const usuario = await this.usuariosRepository.findOne({
                where: { codUser: payload.sub },
            });
            if (!usuario) {
                throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.FORBIDDEN);
            }
            const newAccessToken = this.jwtService.sign({ email: usuario.email, sub: usuario.codUser }, { expiresIn: '10m' });
            return {
                accessToken: newAccessToken,
            };
        }
        catch (error) {
            console.error("Error al renovar el token:", error);
            throw new common_1.HttpException('Refresh token no válido o expirado', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuarios, 'sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map