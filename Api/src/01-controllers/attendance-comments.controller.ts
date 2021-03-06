import {
    HttpPut,
    IActionResult,
    Ok, Controller,
    FromRoute, HttpPost,
    FromBody, NotFound,
    Created, NoContent,
    Authorize
} from "../../framework/core";

import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { AttendanceCommentsModel } from "../03-core/business";
import { AddAttendanceCommentCommand } from "../03-core/business/commands/add-attendance-comment";
import { ModifyAttendanceCommentCommand } from "../03-core/business/commands/modify-attendance-comment";
import { UserRole } from "../03-core";

@Controller('api/attendance-comments')
export class AttendanceCommentsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }
    @HttpPost('{uuid}')
    public async addAttendanceComment(
        @FromBody() attendanceComment: AttendanceCommentsModel,
        @FromRoute('{uuid}') uuid: string): Promise<IActionResult> {
        const command = new AddAttendanceCommentCommand(attendanceComment, uuid);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }
    @HttpPut('{uuid}')
    @Authorize({ role: UserRole[UserRole.Prof] })
    public async updateAttendanceComment(
        @FromBody() attendanceComment: AttendanceCommentsModel[],
        @FromRoute('{uuid}') uuid: string): Promise<IActionResult> {
        const command = new ModifyAttendanceCommentCommand(attendanceComment, uuid);
        await this.commandDispatcher.dispatchAsync(command);
        return new NoContent();
    }
}