import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { Inject } from "../../../../../framework/injector";
import { GetGitStatusQuery } from "./get-git-status.query";
import { GetGitStatusQueryResult } from "./get-git-status.query.result";
import { StudentsController } from "../../../../01-controllers";
import { StudentRepository } from "../../../../02-persistance";
import { HttpClient, HttpResponse } from "../../../../../framework/core";
import { Student } from "../../..";

@QueryHandler({
    queryType: GetGitStatusQuery,
    resultType: GetGitStatusQueryResult
})
export class GetGitStatusQueryHandler implements IQueryHandler<GetGitStatusQuery, GetGitStatusQueryResult> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {

    }
    public async retrieve(query: GetGitStatusQuery): Promise<GetGitStatusQueryResult> {
        const student = await this.studentRepository.getById(query.studentId);
        // const studentAsEntity: Student = Object.assign(new Student(), student);
        // const httpClient = new HttpClient();
        // try {
        //     const header = { Authorization: `token ${studentAsEntity.getGitToken()}` };
        //     httpClient.get('https://api.github.com/users/verciucsergiu/repos', header, (response: HttpResponse) => {
        //         console.log(response.body);
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        return new GetGitStatusQueryResult();
    }
}