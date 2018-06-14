import { ICommand } from '../../../../../framework/CQRS';
import { AttendanceCommentsModel } from '../../models';

export class AddAttendanceCommentCommand implements ICommand {
    constructor(public attendanceCommentModel: AttendanceCommentsModel, public uuid: string) { }
}