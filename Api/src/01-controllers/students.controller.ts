import { HttpGet, IActionResult, Ok, Controller, FromRoute, HttpPost } from "../../framework/core";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from "../03-core/business/queries/get-students-by-group";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
@Controller('api/students')
export class StudentsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('groups/{groups}')
    public async getAllFromGroup(@FromRoute('{groups}') group: string): Promise<IActionResult> {
        const query: GetStudentsByGroupQuery = new GetStudentsByGroupQuery(group);
        const result: GetStudentsByGroupQueryResult =
            await this.queryDispatcher.dispatchAsync<GetStudentsByGroupQuery, GetStudentsByGroupQueryResult>(query);
        return new Ok(result);
    }
}