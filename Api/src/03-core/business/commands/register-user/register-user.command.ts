import { ICommand } from "../../../../../framework/CQRS";
import { RegisterModel } from "../../models/register.model";

export class RegisterUserCommand implements ICommand {
    public success: boolean = false;

    constructor(public registerModel: RegisterModel) { }
}