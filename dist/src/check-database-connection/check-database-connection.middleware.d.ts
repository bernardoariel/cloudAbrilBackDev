import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
export declare class CheckDatabaseConnectionMiddleware implements NestMiddleware {
    private dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
