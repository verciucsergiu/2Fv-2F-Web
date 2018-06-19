import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { ModifyAttendanceCommentCommand } from './modify-attendance-comment.command';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { AttendanceCommentsRepository } from '../../../../02-persistance/attendance-comments.repsitory';
import { StudentRepository } from '../../../../02-persistance';
import { Student } from '../../../domain/student';

@CommandHandler({ commandType: ModifyAttendanceCommentCommand })
export class ModifyAttendanceCommentCommandHandler implements ICommandHandler<ModifyAttendanceCommentCommand> {

    constructor(@Inject(AttendanceCommentsRepository) private attendanceCommentsRepository: AttendanceCommentsRepository) {
    }

    public async handle(command: ModifyAttendanceCommentCommand): Promise<void> {
        for (const model of command.attendanceCommentModel) {
            const attendance = Object.assign(new AttendanceComments(), model);
            await this.attendanceCommentsRepository.update(attendance);
        }
    }
}
