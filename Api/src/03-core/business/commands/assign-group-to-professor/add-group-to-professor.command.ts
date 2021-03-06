import { ICommand } from "../../../../../framework/CQRS";
import { AssignModel } from "../..";

export class AddGroupToProfessorCommand implements ICommand {
    constructor(public assignModel: AssignModel, public professorId: string) { }
}