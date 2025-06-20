// src/types/custom.d.ts

import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;  // Puedes cambiar 'any' por el tipo que desees usar
  }
}
