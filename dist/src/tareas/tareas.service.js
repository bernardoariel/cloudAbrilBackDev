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
var TareasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareasService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const firebase_admin_config_1 = require("../../firebase-admin.config");
const usuarios_entity_1 = require("../auth/entities/usuarios.entity");
const typeorm_2 = require("typeorm");
let TareasService = TareasService_1 = class TareasService {
    constructor(usuariosRepository) {
        this.usuariosRepository = usuariosRepository;
        this.logger = new common_1.Logger(TareasService_1.name);
    }
    async sincronizarUsuarios() {
        this.logger.log('Iniciando sincronización de usuarios con Firebase...');
        await this.sincronizarUsuariosConFirebase();
    }
    async ejecutarTareaManual() {
        await this.sincronizarUsuariosConFirebase();
        return 'Tarea ejecutada manualmente con éxito.';
    }
    async sincronizarUsuariosConFirebase() {
        try {
            const usuarios = await this.usuariosRepository.find({
                where: { Estado: 'A' },
            });
            for (const usuario of usuarios) {
                const email = usuario.email.trim();
                const password = usuario.PassEmail;
                if (!email || !password || email === 'unEmail@hotmail.com' || password === 'unPassword') {
                    this.logger.warn(`Usuario con email ${email} omitido por datos inválidos.`);
                    continue;
                }
                try {
                    await firebase_admin_config_1.firebaseAdmin.auth().getUserByEmail(email);
                    this.logger.log(`Usuario ${email} ya existe en Firebase.`);
                }
                catch (error) {
                    if (error.code === 'auth/user-not-found') {
                        try {
                            await firebase_admin_config_1.firebaseAdmin.auth().createUser({
                                email,
                                password,
                            });
                            this.logger.log(`Usuario ${email} creado en Firebase.`);
                        }
                        catch (creationError) {
                            this.logger.error(`Error al crear el usuario ${email}:`, creationError);
                        }
                    }
                    else {
                        this.logger.error(`Error al verificar el usuario ${email}:`, error);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error('Error al sincronizar usuarios con Firebase:', error);
        }
    }
    async renovarPasswordDesdeCRM(email) {
        if (!email) {
            throw new Error('El email es obligatorio.');
        }
        try {
            const usuarioFirebase = await firebase_admin_config_1.firebaseAdmin.auth().getUserByEmail(email);
            if (!usuarioFirebase) {
                this.logger.warn(`Usuario con email ${email} no encontrado en Firebase.`);
                return `Usuario con email ${email} no existe en Firebase.`;
            }
            const usuarioCRM = await this.usuariosRepository.findOne({ where: { email } });
            if (!usuarioCRM || !usuarioCRM.PassEmail) {
                this.logger.warn(`No se encontró la contraseña en el CRM para el usuario ${email}.`);
                return `No se encontró la contraseña en el CRM para el usuario ${email}.`;
            }
            await firebase_admin_config_1.firebaseAdmin.auth().updateUser(usuarioFirebase.uid, {
                password: usuarioCRM.PassEmail,
            });
            this.logger.log(`Contraseña actualizada en Firebase para ${email}.`);
            return `Contraseña actualizada en Firebase para ${email}.`;
        }
        catch (error) {
            this.logger.error(`Error al renovar la contraseña en Firebase para ${email}:`, error);
            throw new Error(`Error al renovar la contraseña: ${error.message}`);
        }
    }
};
exports.TareasService = TareasService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareasService.prototype, "sincronizarUsuarios", null);
exports.TareasService = TareasService = TareasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuarios, 'sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TareasService);
//# sourceMappingURL=tareas.service.js.map