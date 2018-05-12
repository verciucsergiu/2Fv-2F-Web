import { Controller, HttpGet, IActionResult, Ok, HttpPost, FromRoute, Created, FromBody } from "../../framework/core";
import { ProfessorModel, GetAllProfessorsQuery, GetAllProfessorsQueryHandler, GetAllProfessorsQueryResult } from "../03-core/business";
import { AddNewProfessorCommand } from "../03-core/business/commands/add-new-professor/add-new-professor.command";
import { Inject } from "../../framework/injector";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { GetProfessorByIdQuery, GetProfessorByIdQueryResult } from "../03-core/business/queries/get-professor-by-id";

@Controller('api/professors')
export class ProfessorController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpGet('{id}')
    public async getById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query: GetProfessorByIdQuery = new GetProfessorByIdQuery(id);
        const result: GetProfessorByIdQueryResult =
            await this.queryDispatcher.dispatchAsync<GetProfessorByIdQuery, GetProfessorByIdQueryResult>(query);
        return new Ok(result.professor);
    }

    @HttpGet('all')
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
}