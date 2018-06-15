import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";
import { Inject } from "../../../../../framework/injector";
import { Student } from "../../../domain/student";
import { StudentRepository, AttendanceCommentsRepository } from "../../../../02-persistance";
import { AttendanceComments } from '../../../domain/attendance-comments';
import { AddGitTokenCommand } from "./add-git-token-student.command";

@CommandHandler({
    commandType: AddGitTokenCommand
})
export class AddGitTokenCommandHandler implements ICommandHandler<AddGitTokenCommand> {
    constructor(
        @Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async handle(command: AddGitTokenCommand): Promise<void> {
        const student: any = await this.studentRepository.getById(command.studentId);
        const studentAsEntity: Student = Object.assign(new Student(), student);
        studentAsEntity.setGitToken(command.gitToken.token);
        await this.studentRepository.update(studentAsEntity);
    }
}