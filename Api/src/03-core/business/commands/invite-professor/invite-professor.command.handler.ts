import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { InviteProfessorCommand } from "./invite-professor.command";
import * as emailer from "emailjs";
import { PendingInvitesRepository, ProfessorRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { PendingInvites } from "../../..";
import { InviteStatus } from "./invite-status.enum";
@CommandHandler({
    commandType: InviteProfessorCommand
})
export class InviteProfessorCommandHandler implements ICommandHandler<InviteProfessorCommand> {
    constructor(
        @Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository,
        @Inject(ProfessorRepository) private profRepository: ProfessorRepository
    ) { }

    public async handle(command: InviteProfessorCommand): Promise<void> {
        const existingAcc: any = await this.profRepository.getByEmail(command.emailModel.email);
        if (existingAcc) {
            command.status = InviteStatus.UserExists;
        } else {
            const invite: PendingInvites = Object.assign(new PendingInvites(), command.emailModel);
            const inviteVer = await this.pendingInvitesRepository.add(invite);
            console.log(inviteVer);

            const server = emailer.server.connect({
                user: "2Fv.2FWeb@gmail.com",
                password: "ProiectTW2018",
                host: "smtp.gmail.com",
                ssl: true
            });

            const message = {
                text: "http://localhost:3000/#/register/professor/" + inviteVer.id,
                from: "2Fv.2FWeb@gmail.com",
                to: command.emailModel.email,
                cc: "",
                subject: "Invitation"
            };

            server.send(message, (err, msg) => {
                console.log(err || msg);
            });
        }

    }
}