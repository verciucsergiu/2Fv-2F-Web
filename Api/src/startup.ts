import { ProfessorController, GroupController, AttendanceCommentsController,
     StudentsController, AuthController, MediaController } from './01-controllers';
import { WebApi } from '../framework/core';

@WebApi({
    controllers: [
        ProfessorController,
        GroupController,
        AttendanceCommentsController,
        StudentsController,
        AuthController,
        MediaController
    ],
    settings: {
        port: 4200,
        maxRequestSize: 1e6
    }
})
export class Startup {}
