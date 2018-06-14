import { CommandHandler, ICommandHandler } from "../../../../../framework/CQRS";
import { RegisterProfessorCommand } from ".";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { ProfessorRepository, PendingInvitesRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import * as bcrypt from "bcrypt";
import { User, Professor } from "../../..";
import { ProfessorModel } from "../..";

@CommandHandler({
    commandType: RegisterProfessorCommand
})
export class RegisterProfessorCommandHandler implements ICommandHandler<RegisterProfessorCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository,
        @Inject(ProfessorRepository) private professorRepository: ProfessorRepository,
        @Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository
    ) { }

    public async handle(command: RegisterProfessorCommand): Promise<void> {
        // ---------------------------------------------------------------------
        const saltRounds = 8;
        const hash = bcrypt.hashSync(command.registerModel.password, saltRounds);
        command.registerModel.password = hash;
        // ---------------------------------------------------------------------
        command.registerModel.role = "prof";
        const user: User = Object.assign(new User(), command.registerModel);

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

        await this.userRepository.add(user);
    }
}