import { ICommand } from "../../../../../framework/CQRS";
import { EmailModel } from "../../models";
import { InviteStatus } from "./invite-status.enum";

export class InviteProfessorCommand implements ICommand {
    public status: InviteStatus;

    constructor(public emailModel: EmailModel) { }
}