import { ICommand } from "../../../../../framework/CQRS";
import { RegisterModel } from "../../models/register.model";

export class RegisterUserCommand implements ICommand {
    constructor(public registerModel: RegisterModel) { }
}