import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { RegisterUserCommand } from "./register-user.command";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { Inject } from "../../../../../framework/injector";
import { User, Professor } from "../../..";
import { ProfessorModel, StudentModel } from "../..";
import { StudentRepository } from "../../../../02-persistance";
import { Student } from "../../../domain/student";
import { UserRole } from "../../../domain/user-role.enum";
import { UserService } from '../../utils/user.service';

@CommandHandler({
    commandType: RegisterUserCommand
})
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @Inject(UserRepository) private userRepository: UserRepository,
        @Inject(StudentRepository) private studentRepository: StudentRepository,
        @Inject(UserService) private userService: UserService) { }

    public async handle(command: RegisterUserCommand): Promise<void> {
        const stud: any = await this.studentRepository.getStudentByCNP(command.registerModel.cnp);
        if (!stud) {
            command.success = false;
            return;
        }

        command.registerModel.password = this.userService.getPasswordHash(command.registerModel.password);
        command.registerModel.role = UserRole.Student;
        const user: User = Object.assign(new User(), command.registerModel);
        if (stud) {
            user.setFK(stud.id);
            await this.userRepository.add(user);
            command.success = true;
        }
    }
}