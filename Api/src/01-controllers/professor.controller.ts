import {
    Controller,
    HttpGet, IActionResult,
    Ok, HttpPost, FromRoute,
    Created, FromBody,
    HttpDelete, Authorize
} from "../../framework/core";

import {
    ProfessorModel, AssignModel,
    GetAllProfessorsQuery, GetAllProfessorsQueryHandler,
    GetAllProfessorsQueryResult, AddGroupToProfessorCommand, InviteProfessorCommand, EmailModel
} from "../03-core/business";

import { AddNewProfessorCommand } from "../03-core/business/commands/add-new-professor/add-new-professor.command";
import { Inject } from "../../framework/injector";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { GetProfessorByIdQuery, GetProfessorByIdQueryResult } from "../03-core/business/queries/get-professor-by-id";
import { RemoveGroupFromProfessor } from "../03-core/business/commands/remove-group-from-professor";
import { UserRole } from "../03-core/domain/user-role.enum";

@Controller('api/professors')
export class ProfessorController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('{id}')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async getById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query: GetProfessorByIdQuery = new GetProfessorByIdQuery(id);
        const result: GetProfessorByIdQueryResult =
            await this.queryDispatcher.dispatchAsync<GetProfessorByIdQuery, GetProfessorByIdQueryResult>(query);
        return new Ok(result.professor);
    }

    @HttpGet('all')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async getAll(): Promise<IActionResult> {
        const query: GetAllProfessorsQuery = new GetAllProfessorsQuery();
        const result: GetAllProfessorsQueryResult =
            await this.queryDispatcher.dispatchAsync<GetAllProfessorsQuery, GetAllProfessorsQueryResult>(query);
        return new Ok(result);
    }

    @HttpPost('')
    public async addProf(@FromBody() professor: ProfessorModel): Promise<IActionResult> {
        const command = new AddNewProfessorCommand(professor);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpPost('{id}/groups')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async assignGroupToProfessor(
        @FromRoute('{id}') professorId: string,
        @FromBody() assignModel: AssignModel): Promise<IActionResult> {

        const command = new AddGroupToProfessorCommand(assignModel, professorId);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpDelete('{id}/groups')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async deleteGroupFromProfessor(
        @FromRoute('{id}') professorId: string,
        @FromBody() assignModel: AssignModel): Promise<IActionResult> {

        const command = new RemoveGroupFromProfessor(assignModel, professorId);
        await this.commandDispatcher.dispatchAsync(command);
        return new Ok();
    }

}