import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { RegisterUserCommand } from "./register-user.command";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { Inject } from "../../../../../framework/injector";
import { User, Professor } from "../../..";
import { ProfessorModel } from "../..";

@CommandHandler({
    commandType: RegisterUserCommand
})
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository
    ) { }

    public async handle(command: RegisterUserCommand): Promise<void> {
        // ---------------------------------------------------------------------
        const saltRounds = 8;
        const hash = bcrypt.hashSync(command.registerModel.password, saltRounds);
        command.registerModel.password = hash;
        // ---------------------------------------------------------------------
        command.registerModel.role = "user";
        const user: User = Object.assign(new User(), command.registerModel);
        user.setFK("0");
        console.log(command);
        await this.userRepository.add(user);
    }
}