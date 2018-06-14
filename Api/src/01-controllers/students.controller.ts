import { HttpGet, IActionResult, Ok, Controller, FromRoute, HttpPost, NotFound, FromBody, Created, Authorize } from "../../framework/core";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from "../03-core/business/queries/get-students-by-group";
import { GetStudentsQuery, GetStudentsQueryResult } from "../03-core/business/queries/get-students";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { StudentModel, AddNewStudentCommand, GetAllStudentsQuery, GetAllStudentQueryResult } from "../03-core/business";
import { UserRole } from "../03-core/domain/user-role.enum";
import { ApiController } from "../../framework/core/api-controller";

@Controller('api/students')
export class StudentsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
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
        const result = await this.queryDispatcher.dispatchAsync<GetAllStudentsQuery, GetAllStudentQueryResult>(query);
        return new Ok(result.students);
    }

    @HttpGet('groups/{groups}')
    @Authorize({ role: UserRole[UserRole.Student] })    
    @Authorize({ role: UserRole[UserRole.Admin] })
    @Authorize({ role: UserRole[UserRole.Prof] })
    public async getAllFromGroup(@FromRoute('{groups}') group: string): Promise<IActionResult> {
        const query: GetStudentsByGroupQuery = new GetStudentsByGroupQuery(group);
        const result: GetStudentsByGroupQueryResult =
            await this.queryDispatcher.dispatchAsync<GetStudentsByGroupQuery, GetStudentsByGroupQueryResult>(query);
        const student = result.students[0];
        if (student == null) { return new NotFound(); }
        return new Ok(result.students);
    }

    @HttpGet('group/{group}')
    @Authorize({ role: UserRole[UserRole.Student] })    
    @Authorize({ role: UserRole[UserRole.Admin] })
    @Authorize({ role: UserRole[UserRole.Prof] })
    public async getFromGroup(@FromRoute('{group}') group: string): Promise<IActionResult> {
        const query: GetStudentsQuery = new GetStudentsQuery(group);
        const result: GetStudentsQueryResult =
            await this.queryDispatcher.dispatchAsync<GetStudentsQuery, GetStudentsQueryResult>(query);
        const student = result.students[0];
        if (student == null) { return new NotFound(); }
        return new Ok(result.students);
    }

}