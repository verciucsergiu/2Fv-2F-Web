import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { AddAttendanceCommentCommand } from './add-attendance-comment.command';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { AttendanceCommentsRepository } from '../../../../02-persistance/attendance-comments.repsitory';
import { StudentRepository } from '../../../../02-persistance';
import { Student } from '../../../domain/student';

@CommandHandler({ commandType: AddAttendanceCommentCommand })
export class AddAttendanceCommentsCommandHandler implements ICommandHandler<AddAttendanceCommentCommand> {

    constructor(@Inject(AttendanceCommentsRepository) private attendanceCommentsRepository: AttendanceCommentsRepository,
                @Inject(StudentRepository) private studentRepository: StudentRepository) {
    }

    public async handle(command: AddAttendanceCommentCommand): Promise<void> {
        console.log("ici");
        const attendance: AttendanceComments = Object.assign(new AttendanceComments(), command.attendanceCommentModel);
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        attendance.student = student;
       // student.attendanceComments.push(attendance);
       // await this.studentRepository.update(student);
        await this.attendanceCommentsRepository.add(attendance);
    }
}