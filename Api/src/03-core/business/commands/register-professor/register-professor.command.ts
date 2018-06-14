import { ICommand } from "../../../../../framework/CQRS";
import { RegisterModel } from "../../models/register.model";

export class RegisterProfessorCommand implements ICommand {
    constructor(public registerModel: RegisterModel) { }
}