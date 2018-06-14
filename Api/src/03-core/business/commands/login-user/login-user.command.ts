import { ICommand } from "../../../../../framework/CQRS";
import { LoginModel } from "../../models";

export class LoginUserCommand implements ICommand {
    public success: boolean;

    public token: string;

    constructor(public loginModel: LoginModel) {

    }
}