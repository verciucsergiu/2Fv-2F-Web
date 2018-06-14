import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GetStudentsByGroupQuery, GetStudentsByGroupQueryResult } from ".";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";

@QueryHandler({
    queryType: GetStudentsByGroupQuery,
    resultType: GetStudentsByGroupQueryResult
})
export class GetStudentsByGroupQueryHandler implements IQueryHandler<GetStudentsByGroupQuery, GetStudentsByGroupQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    public async retrieve(query: GetStudentsByGroupQuery): Promise<GetStudentsByGroupQueryResult> {
        const students: any = await this.repository.getStudentsWithAttendance(query.group);
        const studentsMapped: Array<StudentModel> = students.map((pf: StudentModel) => Object.assign(new StudentModel(), pf));
        console.log(students.firstName);
        return new GetStudentsByGroupQueryResult(studentsMapped);
    }
}
