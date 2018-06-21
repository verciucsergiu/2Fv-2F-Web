import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository } from '../../../../02-persistance';
import { Student } from '../../../domain/student';
import { AddLinkedTokenCommand } from './add-linked-token.command';
@CommandHandler({ commandType: AddLinkedTokenCommand })
export class AddLinkedTokenCommandHandler implements ICommandHandler<AddLinkedTokenCommand> {

    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {
    }

    public async handle(command: AddLinkedTokenCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        student.lnToken1 = command.token.substr(0, 175);
        student.lnToken2 = command.token.substr(175, 350);
        await this.studentRepository.update(student);
    }
}
