import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { AddNewStudentCommand } from ".";
import { StudentModel } from "../..";
import { Inject } from "../../../../../framework/injector";
import { Student } from "../../../domain/student";
import { StudentRepository } from "../../../../02-persistance";

@CommandHandler({
    commandType: AddNewStudentCommand
})
export class AddNewStudentCommandHandler implements ICommandHandler<AddNewStudentCommand> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async handle(command: AddNewStudentCommand): Promise<void> {
        const student: Student = Object.assign(new Student(), command.studentModel);
        await this.studentRepository.add(student);
    }
}