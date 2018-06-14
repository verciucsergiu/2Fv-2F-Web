import { ICommand } from '../../../../../framework/CQRS';
import { AttendanceCommentsModel } from '../../models';

export class ModifyAttendanceCommentCommand implements ICommand {
    constructor(public attendanceCommentModel: AttendanceCommentsModel, public uuid: string) { }
}