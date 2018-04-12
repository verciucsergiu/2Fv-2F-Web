import { ProfessorController } from './01-controllers';
import { WebApi } from '../framework/core';

@WebApi({
    controllers: [
        ProfessorController
    ],
    settings: {
        port: 4200,
        maxRequestSize: 1e6
    }
})
export class Startup {}
