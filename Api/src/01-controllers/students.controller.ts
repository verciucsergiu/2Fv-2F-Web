import {
    HttpGet,
    IActionResult,
    Ok, Controller, FromRoute, HttpPost,
    NotFound, FromBody, Created,
    Authorize
} from "../../framework/core";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from "../03-core/business/queries/get-students-by-group";
import { GetStudentsQuery, GetStudentsQueryResult } from "../03-core/business/queries/get-students";
import { CommandDispatcher, QueryDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import {
    StudentModel,
    AddNewStudentCommand,
    GetAllStudentsQuery,
    GetAllStudentsQueryResult
} from "../03-core/business";
import { UserRole } from "../03-core/domain/user-role.enum";
import { ApiController } from "../../framework/core/api-controller";
import { GetStudentDetailsQuery } from "../03-core/business/queries/get-student-details/get-student-details.query";
import { GetStudentDetailsQueryResult } from "../03-core/business/queries/get-student-details/get-student-details.query.result";
import { AddGitTokenCommand } from "../03-core/business/commands/add-git-token-student/add-git-token-student.command";
import { GitTokenModel } from "../03-core/business/models/git-token.model";
import { GetGitStatusQuery } from "../03-core/business/queries/get-git-status/get-git-status.query";

@Controller('api/students')
export class StudentsController extends ApiController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
        super();
    }

    @HttpPost('')
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
    @Authorize({ role: UserRole[UserRole.Student] })
    public async getStudentDetails(): Promise<IActionResult> {
        const query = new GetStudentDetailsQuery(this.principal.foreignid);
        const result = await this.queryDispatcher.dispatchAsync<GetStudentDetailsQuery, GetStudentDetailsQueryResult>(query);
        return new Ok(result.student);
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

    @HttpPost('git')
    @Authorize({ role: UserRole[UserRole.Student] })
    public async attachGit(@FromBody() gitToken: GitTokenModel): Promise<IActionResult> {
        const command = new AddGitTokenCommand(gitToken, this.principal.foreignid);
        await this.commandDispatcher.dispatchAsync(command);
        return new Ok();
    }

    @HttpGet('git')
    @Authorize({ role: UserRole[UserRole.Student] })
    public async getGitStatus(): Promise<IActionResult> {
        const query = new GetGitStatusQuery(this.principal.foreignid);
        await this.queryDispatcher.dispatchAsync<GetGitStatusQuery, GetStudentsQueryResult>(query);
        return new Ok();
    }
}