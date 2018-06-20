import { ICommand } from "../../../../../framework/CQRS";
import { FacebookTokenModel } from "../../models";

export class AddFacebookTokenCommand implements ICommand {
    constructor(public token: FacebookTokenModel, public studentId: string) { }
}