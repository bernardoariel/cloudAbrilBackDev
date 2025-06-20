import { TareasService } from './tareas.service';
export declare class TareasController {
    private readonly tareasService;
    constructor(tareasService: TareasService);
    ejecutarTareaManual(): Promise<string>;
    renovarPassword(email: string): Promise<string>;
}
