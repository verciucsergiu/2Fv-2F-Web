import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { AddNewStudentCommand } from ".";
import { StudentModel } from "../..";
import { Inject } from "../../../../../framework/injector";
import { Student } from "../../../domain/student";
import { StudentRepository, AttendanceCommentsRepository } from "../../../../02-persistance";
import { AttendanceComments } from '../../../domain/attendance-comments';

@CommandHandler({
    commandType: AddNewStudentCommand
})
export class AddNewStudentCommandHandler implements ICommandHandler<AddNewStudentCommand> {
    constructor(
        @Inject(StudentRepository) private studentRepository: StudentRepository,
        @Inject(AttendanceCommentsRepository) private attendanceRepository: AttendanceCommentsRepository) { }

    public async handle(command: AddNewStudentCommand): Promise<void> {
        let student: Student = Object.assign(new Student(), command.studentModel);

        student = await this.studentRepository.add(student);

        for (let i = 0; i < 13; i++) {
            const attendance: AttendanceComments = Object.assign(new AttendanceComments());
            attendance.student = student;
            attendance.setWeekNumber(i);
            attendance.setComment("");
            attendance.setValue("");
            await this.attendanceRepository.add(attendance);
        }
    }
}