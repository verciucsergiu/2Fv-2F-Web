import { ICommand } from "../../../../../framework/CQRS";
import { ProfRegisterModel } from "../..";

export class RegisterProfessorCommand implements ICommand {
    constructor(public registerModel: ProfRegisterModel) { }
}