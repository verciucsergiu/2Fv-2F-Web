import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { InviteProfessorCommand } from "./invite-professor.command";
import * as emailer from "emailjs";
import { PendingInvitesRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { PendingInvites } from "../../..";
@CommandHandler({
    commandType: InviteProfessorCommand
})
export class InviteProfessorCommandHandler implements ICommandHandler<InviteProfessorCommand> {
    constructor(@Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository) { }

    public async handle(command: InviteProfessorCommand) {

        let invite: PendingInvites = Object.assign(new PendingInvites(), command.emailModel);
        invite = await this.pendingInvitesRepository.add(invite);

        const server = emailer.server.connect({
            user: "2Fv.2FWeb@gmail.com",
            password: "ProiectTW2018",
            host: "smtp.gmail.com",
            ssl: true
        });

        const message = {
            text: invite.id,
            from: "2Fv.2FWeb@gmail.com",
            to: "ratzoiu2000@gmail.com",
            cc: "",
            subject: "Invitation"
        };

        server.send(message, (err, msg) => {
            console.log(err || msg);
        });

        console.log(command.emailModel.email);
    }
}