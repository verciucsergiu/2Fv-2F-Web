import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { Inject } from "../../../../../framework/injector";
import { Student } from "../../../domain/student";
import { AddFacebookTokenCommand } from "./add-facebook-token-student.command";
import { StudentRepository } from "../../../../02-persistance";

@CommandHandler({
    commandType: AddFacebookTokenCommand
})
export class AddFacebookTokenHandler implements ICommandHandler<AddFacebookTokenCommand> {
    constructor(
        @Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async handle(command: AddFacebookTokenCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.studentId);
        const studentAsEntity: Student = Object.assign(new Student(), student);
        studentAsEntity.setFbToken(command.token.authToken);
        await this.studentRepository.update(studentAsEntity);
    }
}