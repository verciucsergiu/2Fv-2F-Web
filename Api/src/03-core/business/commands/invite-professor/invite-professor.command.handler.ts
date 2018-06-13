import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { InviteProfessorCommand } from "./invite-professor.command";

@CommandHandler({
    commandType: InviteProfessorCommand
})
export class InviteProfessorCommandHandler implements ICommandHandler<InviteProfessorCommand> {
    constructor() { }

    public handle(command: InviteProfessorCommand): void {
        console.log(command.emailModel.email);
    }
}