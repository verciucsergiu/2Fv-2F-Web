import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";
import { GetStudentDetailsQuery } from "./get-student-details.query";
import { GetStudentDetailsQueryResult } from "./get-student-details.query.result";

@QueryHandler({
    queryType: GetStudentDetailsQuery,
    resultType: GetStudentDetailsQueryResult
})
export class GetStudentDetailsQueryHandler implements IQueryHandler<GetStudentDetailsQuery, GetStudentDetailsQueryResult> {

    constructor(@Inject(StudentRepository) private studentsRepositiory: StudentRepository) {
    }

    public async retrieve(query: GetStudentDetailsQuery): Promise<GetStudentDetailsQueryResult> {
        const student = await this.studentsRepositiory.getById(query.studentId);
        const mappdStudent = Object.assign(new StudentModel(), student);
        return new GetStudentDetailsQueryResult(mappdStudent);
    }
}