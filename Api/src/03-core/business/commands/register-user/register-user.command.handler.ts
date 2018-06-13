import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { RegisterUserCommand } from "./register-user.command";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { Inject } from "../../../../../framework/injector";
import { ProfessorRepository, PendingInvitesRepository } from "../../../../02-persistance";
import { User, Professor } from "../../..";
import { ProfessorModel } from "../..";

@CommandHandler({
    commandType: RegisterUserCommand
})
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository,
        @Inject(ProfessorRepository) private professorRepository: ProfessorRepository,
        @Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository
    ) { }

    public async handle(command: RegisterUserCommand): Promise<void> {
        // ---------------------------------------------------------------------
        const saltRounds = 8;
        const hash = bcrypt.hashSync(command.registerModel.password, saltRounds);
        command.registerModel.password = hash;
        // ---------------------------------------------------------------------

        const user: User = Object.assign(new User(), command.registerModel);
        if (command.registerModel.role === "prof") {
            const profModel = new ProfessorModel();
            profModel.firstName = command.registerModel.username;
            profModel.lastName = command.registerModel.username;
            profModel.rank = "Lect.";
            profModel.email = command.registerModel.email;

            console.log("PROF MODEL -> " + profModel);
            let prof: any = Object.assign(new Professor(), profModel);
            prof = await this.professorRepository.add(prof);
            user.setFK(prof.id);
            await this.pendingInvitesRepository.deleteInvite(command.registerModel.email);
        }
        await this.userRepository.add(user);
    }
}