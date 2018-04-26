import { ICommand } from "../../../../../framework/CQRS";

export class AddGroupToProfessorCommand implements ICommand {
    constructor(public idGroup: string, public idProfessor: string) { }
}