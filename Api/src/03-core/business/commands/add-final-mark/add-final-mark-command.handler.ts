import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository, AttendanceCommentsRepository } from '../../../../02-persistance';
import { AddFinalMarkCommand } from './add-final-mark-command';
const PRESENCEBONUS = 0.15;
@CommandHandler({ commandType: AddFinalMarkCommand })
export class AddFinalMarkCommandHandler implements ICommandHandler<AddFinalMarkCommand> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository
) {
    }
    public async handle(command: AddFinalMarkCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        const finalMark = Math.round(student.gitMark + student.classesMark + student.twitterMark) / 3 + student.linkedinMark;
        student.finalMark = finalMark;
        student.willPromote = "Yes";
        if (finalMark < 5)  {
            student.willPromote = "No";
        }
        if (student.finalMark > 10) { student.finalMark = 10; }
        await this.studentRepository.update(student);
    }
}