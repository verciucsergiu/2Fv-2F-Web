import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { UpdateTwitterMarkCommand } from "./update-twitter-mark.command";
import { Inject } from "../../../../../framework/injector";
import { Student } from "../../..";
import { StudentRepository } from "../../../../02-persistance/student.repository";

@CommandHandler({
    commandType: UpdateTwitterMarkCommand
})
export class UpdateTwitterMarkCommandHandler implements ICommandHandler<UpdateTwitterMarkCommand> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async handle(command: UpdateTwitterMarkCommand): Promise<void> {
        const stud: any = await this.studentRepository.getStudentWithAttendance(command.twitterModel.uuid);
        stud.twitterMark = command.twitterModel.twitterMark;
        await this.studentRepository.update(stud);
    }
}