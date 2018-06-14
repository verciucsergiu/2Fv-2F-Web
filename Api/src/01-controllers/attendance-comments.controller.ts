import { HttpPut, IActionResult, Ok, Controller, FromRoute, HttpPost, FromBody, NotFound, Created, NoContent } from "../../framework/core";

import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { AttendanceCommentsModel } from "../03-core/business";
import { AddAttendanceCommentCommand } from "../03-core/business/commands/add-attendance-comment";
import { ModifyAttendanceCommentCommand} from "../03-core/business/commands/modify-attendance-comment";
@Controller('api/attendance-comments')
export class AttendanceCommentsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }
    @HttpPost('{uuid}')
    public async addAttendanceComment(@FromBody() attendanceComment: AttendanceCommentsModel,
                                      @FromRoute('{uuid}') uuid: string): Promise<IActionResult> {
        const command = new AddAttendanceCommentCommand(attendanceComment, uuid);
        console.log(attendanceComment.value);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }
    @HttpPut('{uuid}')
    public async updateAttendanceComment(@FromBody() attendanceComment: AttendanceCommentsModel,
                                         @FromRoute('{uuid}') uuid: string): Promise<IActionResult> {
        const command = new ModifyAttendanceCommentCommand(attendanceComment, uuid);
        console.log(attendanceComment.value);
        await this.commandDispatcher.dispatchAsync(command);
        return new NoContent();
    }
}