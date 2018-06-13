import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { RegisterUserCommand } from "./register-user.command";
import * as bcrypt from "bcrypt";

@CommandHandler({
    commandType: RegisterUserCommand
})
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor() { }

    public async handle(command: RegisterUserCommand): Promise<void> {

        const saltRounds = 8;

        bcrypt.hash(command.registerModel.password, saltRounds, (err, hash) => {
            console.log(hash);
        });
    }
}