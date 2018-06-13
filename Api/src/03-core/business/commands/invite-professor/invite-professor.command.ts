import { ICommand } from "../../../../../framework/CQRS";
import { EmailModel } from "../../models";

export class InviteProfessorCommand implements ICommand {
    constructor(public emailModel: EmailModel) { }
}