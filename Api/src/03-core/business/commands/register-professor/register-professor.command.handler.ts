import { CommandHandler, ICommandHandler } from "../../../../../framework/CQRS";
import { RegisterProfessorCommand } from ".";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { ProfessorRepository, PendingInvitesRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import * as bcrypt from "bcrypt";
import { User, Professor } from "../../..";
import { UserService } from '../../utils/user.service';
import { ProfessorModel } from "../..";
import { UserRole } from "../../../domain/user-role.enum";

@CommandHandler({
    commandType: RegisterProfessorCommand
})
export class RegisterProfessorCommandHandler implements ICommandHandler<RegisterProfessorCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository,
        @Inject(ProfessorRepository) private professorRepository: ProfessorRepository,
        @Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository,
        @Inject(UserService) private userService: UserService
    ) { }

    public async handle(command: RegisterProfessorCommand): Promise<void> {
        command.registerModel.password = this.userService.getPasswordHash(command.registerModel.password);
        command.registerModel.role = UserRole.Prof;
        const user: User = Object.assign(new User(), command.registerModel);

        const profModel = new ProfessorModel();
        profModel.firstName = command.registerModel.username;
        profModel.lastName = command.registerModel.username;
        profModel.rank = "Lect.";
        profModel.email = command.registerModel.email;

        const prof: Professor = Object.assign(new Professor(), profModel);
        const addedProf = await this.professorRepository.add(prof);
        user.setFK(addedProf.id);
        await this.pendingInvitesRepository.deleteInvite(command.registerModel.email);

        await this.userRepository.add(user);
    }
}