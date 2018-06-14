import { HttpGet, IActionResult, Ok, Controller, FromRoute, HttpPost, NotFound, FromBody, Created } from "../../framework/core";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from "../03-core/business/queries/get-students-by-group";
import { GetStudentsQuery, GetStudentsQueryResult } from "../03-core/business/queries/get-students";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { StudentModel, AddNewStudentCommand } from "../03-core/business";

@Controller('api/students')
export class StudentsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpPost('create')
    public async addNewStudent(@FromBody() studentModel: StudentModel): Promise<IActionResult> {
        const command = new AddNewStudentCommand(studentModel);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpGet('groups/{groups}')
    public async getAllFromGroup(@FromRoute('{groups}') group: string): Promise<IActionResult> {
        const query: GetStudentsByGroupQuery = new GetStudentsByGroupQuery(group);
        const result: GetStudentsByGroupQueryResult =
            await this.queryDispatcher.dispatchAsync<GetStudentsByGroupQuery, GetStudentsByGroupQueryResult>(query);
        const student = result.students[0];
        if (student == null) { return new NotFound(); }
        return new Ok(result.students);
    }

    @HttpGet('group/{group}')
    public async getFromGroup(@FromRoute('{group}') group: string): Promise<IActionResult> {
        const query: GetStudentsQuery = new GetStudentsQuery(group);
        const result: GetStudentsQueryResult =
            await this.queryDispatcher.dispatchAsync<GetStudentsQuery, GetStudentsQueryResult>(query);
        const student = result.students[0];
        if (student == null) { return new NotFound(); }
        return new Ok(result.students);
    }

}