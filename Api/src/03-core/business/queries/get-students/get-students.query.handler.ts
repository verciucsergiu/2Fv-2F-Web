import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GetStudentsQuery, GetStudentsQueryResult } from ".";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";

@QueryHandler({
    queryType: GetStudentsQuery,
    resultType: GetStudentsQueryResult
})
export class GetStudentsByGroupQueryHandler implements IQueryHandler<GetStudentsQuery, GetStudentsQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    public async retrieve(query: GetStudentsQuery): Promise<GetStudentsQueryResult> {
        const students: any = await this.repository.getStudentsWithAttendance(query.group);
        const studentsMapped: Array<StudentModel> = students.map((stud: StudentModel) => Object.assign(new StudentModel(), stud));
        return new GetStudentsQueryResult(studentsMapped);
    }
}
