import { Controller, HttpGet, HttpPost, IActionResult, FromBody, Created, Ok, FromRoute } from "../../framework/core";
import { Inject } from "../../framework/injector";
import { QueryDispatcher, CommandDispatcher } from "../../framework/CQRS";
import {
    GroupModel, AddNewGroupCommand,
    AddGroupToProfessorCommand, GetGroupByIdQuery, GetGroupByIdQueryResult, GetGroupsQuery, GetGroupsQueryResult
} from "../03-core/business";
import { Authorize } from "../../framework/core/authorization/authorize.decorator";
import { UserRole } from "../03-core/domain/user-role.enum";

@Controller('api/groups')
export class GroupController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('{id}')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async getGroupById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query: GetGroupByIdQuery = new GetGroupByIdQuery(id);
        const result: GetGroupByIdQueryResult =
            await this.queryDispatcher.dispatchAsync<GetGroupByIdQuery, GetGroupByIdQueryResult>(query);
        return new Ok(result.group);
    }

    @HttpGet('')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async getGroups(): Promise<IActionResult> {
        const query: GetGroupsQuery = new GetGroupsQuery();
        const result: GetGroupsQueryResult =
            await this.queryDispatcher.dispatchAsync<GetGroupsQuery, GetGroupsQueryResult>(query);
        return new Ok(result.group);
    }

    @HttpPost('')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async addGroup(@FromBody() group: GroupModel): Promise<IActionResult> {
        const command = new AddNewGroupCommand(group);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }
}