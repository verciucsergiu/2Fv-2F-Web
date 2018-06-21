import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository, AttendanceCommentsRepository } from '../../../../02-persistance';
import { AddClassesMarkCommand } from './add-classes-mark-command';
const PRESENCEBONUS = 0.15;
@CommandHandler({ commandType: AddClassesMarkCommand })
export class AddClassesMarkCommandHandler implements ICommandHandler<AddClassesMarkCommand> {

    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository,
                @Inject(AttendanceCommentsRepository) private attendanceRepository: AttendanceCommentsRepository
) {
    }
    public async handle(command: AddClassesMarkCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        let i = 1;
        let classMark : number = 0;
        while (i < 13) {
            const attendance : any = await this.attendanceRepository.getAttendance(command.uuid, i);
            console.log(student);
            classMark += attendance.value / 13;
            if (attendance.value !== "" || attendance.comment !== "") {
                classMark += PRESENCEBONUS;
            }
            i++;
        }
        student.classesMark = Math.round(classMark);
        await this.studentRepository.update(student);
    }
}