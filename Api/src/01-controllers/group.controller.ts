import { Controller, HttpGet, HttpPost, IActionResult, FromBody, Created, Ok, FromRoute } from "../../framework/core";
import { Inject } from "../../framework/injector";
import { QueryDispatcher, CommandDispatcher } from "../../framework/CQRS";
import {
    GroupModel, AddNewGroupCommand,
    AddGroupToProfessorCommand, GetGroupByIdQuery, GetGroupByIdQueryResult
} from "../03-core/business";

@Controller('api/groups')
export class GroupController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('{id}')
    public async getGroupById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query: GetGroupByIdQuery = new GetGroupByIdQuery(id);
        const result: GetGroupByIdQueryResult =
            await this.queryDispatcher.dispatchAsync<GetGroupByIdQuery, GetGroupByIdQueryResult>(query);
        return new Ok(result.group);
    }

    @HttpPost('')
    public async addGroup(@FromBody() group: GroupModel): Promise<IActionResult> {
        const command = new AddNewGroupCommand(group);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpPost('assign/{idGroup}/{idProfessor}')
    public async assignGroupToProfessor(@FromRoute('{idGroup}') idGroup: string,
                                        @FromRoute('{idProfessor}') idProfessor: string): Promise<IActionResult> {

        const command = new AddGroupToProfessorCommand(idGroup, idProfessor);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }
}