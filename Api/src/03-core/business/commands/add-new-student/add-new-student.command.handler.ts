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
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository,
                @Inject(AttendanceCommentsRepository) private attendanceRepository: AttendanceCommentsRepository) { }

    public async handle(command: AddNewStudentCommand): Promise<void> {
        const student: Student = Object.assign(new Student(), command.studentModel);
        for (let i = 0; i < 13; i++) {
            const attendance: AttendanceComments = Object.assign(new AttendanceComments());
            attendance.student = student;
            await attendance.setWeekNumber(i);
            await attendance.setComment("");
            await attendance.setValue("");
            this.attendanceRepository.add(attendance);
        }
        await this.studentRepository.add(student);
    }
}