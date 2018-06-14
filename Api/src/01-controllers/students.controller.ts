import { HttpGet, IActionResult, Ok, Controller, FromRoute, HttpPost, NotFound, FromBody, Created, Authorize } from "../../framework/core";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from "../03-core/business/queries/get-students-by-group";
import { GetStudentsQuery, GetStudentsQueryResult } from "../03-core/business/queries/get-students";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { StudentModel, AddNewStudentCommand, GetAllStudentsQuery, GetAllStudentsQueryResult } from "../03-core/business";
import { UserRole } from "../03-core/domain/user-role.enum";
import { ApiController } from "../../framework/core/api-controller";
import { GetStudentDetailsQuery } from "../03-core/business/queries/get-student-details/get-student-details.query";
import { GetStudentDetailsQueryResult } from "../03-core/business/queries/get-student-details/get-student-details.query.result";

@Controller('api/students')
export class StudentsController extends ApiController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
            super();
    }

    @HttpPost('')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async addNewStudent(@FromBody() studentModel: StudentModel): Promise<IActionResult> {
        const command = new AddNewStudentCommand(studentModel);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpGet('')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async getStudents(): Promise<IActionResult> {
        const query = new GetAllStudentsQuery();
        const result = await this.queryDispatcher.dispatchAsync<GetAllStudentsQuery, GetAllStudentsQueryResult>(query);
        return new Ok(result.students);
    }

    @HttpGet('details')
    @Authorize({ role: UserRole[UserRole.Student]})
    public async getStudentDetails(): Promise<IActionResult> {
        const query = new GetStudentDetailsQuery(this.principal.id);
        const result = await this.queryDispatcher.dispatchAsync<GetStudentDetailsQuery, GetStudentDetailsQueryResult>(query);
        return new Ok(result.student);
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