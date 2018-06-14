import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { RegisterUserCommand } from "./register-user.command";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { Inject } from "../../../../../framework/injector";
import { User, Professor } from "../../..";
import { ProfessorModel, StudentModel } from "../..";
import { StudentRepository } from "../../../../02-persistance";
import { Student } from "../../../domain/student";

@CommandHandler({
    commandType: RegisterUserCommand
})
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository,
        @Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async handle(command: RegisterUserCommand): Promise<void> {
        // ---------------------------------------------------------------------
        const saltRounds = 8;
        const hash = bcrypt.hashSync(command.registerModel.password, saltRounds);
        command.registerModel.password = hash;
        // ---------------------------------------------------------------------

        command.registerModel.role = "user";
        const user: User = Object.assign(new User(), command.registerModel);
        const stud: any = await this.studentRepository.getStudentByCNP(command.registerModel.cnp);
        user.setFK(stud[0].id);
        await this.userRepository.add(user);
    }
}