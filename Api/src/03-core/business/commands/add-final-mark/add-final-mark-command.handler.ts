import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import {  Inject } from '../../../../../framework/injector';
import { StudentRepository } from '../../../../02-persistance';
import { AddFinalMarkCommand } from './add-final-mark-command';
@CommandHandler({ commandType: AddFinalMarkCommand })
export class AddFinalMarkCommandHandler implements ICommandHandler<AddFinalMarkCommand> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository
    ) {
    }
    public async handle(command: AddFinalMarkCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        const finalMark = Math.round(
            student.gitMark * 0.35 +
            student.classesMark * 0.35 +
            student.twitterMark * 0.15 +
            student.fbMark * 0.15) +
            student.linkedinMark;
        student.finalMark = finalMark;
        student.willPromote = "Yes";
        if (finalMark < 5) {
            student.willPromote = "No";
        }
        if (student.finalMark > 10) { student.finalMark = 10; }
        await this.studentRepository.update(student);
    }
}