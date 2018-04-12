import { Controller, HttpGet, HttpPost, IActionResult, FromBody, Created, Ok, FromRoute } from "../../framework/core";
import { Inject } from "../../framework/injector";
import { QueryDispatcher, CommandDispatcher } from "../../framework/CQRS";
import { GroupModel, AddNewGroupCommand, GetGroupsByProfessorIdQuery, GetGroupsByProfessorIdQueryResult } from "../03-core/business";

@Controller('api/groups')
export class GroupController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('{id}')
    public async getGroupsByProfessorId(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query: GetGroupsByProfessorIdQuery = new GetGroupsByProfessorIdQuery(id);
        const result: GetGroupsByProfessorIdQueryResult =
            await this.queryDispatcher.dispatchAsync<GetGroupsByProfessorIdQuery, GetGroupsByProfessorIdQueryResult>(query);
        return new Ok(result.groups);
    }

    @HttpPost('')
    public async addGroup(@FromBody() group: GroupModel): Promise<IActionResult> {
        const command = new AddNewGroupCommand(group);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }
}