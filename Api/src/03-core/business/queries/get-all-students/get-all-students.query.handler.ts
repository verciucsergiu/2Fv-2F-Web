import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { GetAllStudentsQuery } from "./get-all-students.query";
import { GetAllStudentQueryResult } from "./get-all-students.query.result";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";

@QueryHandler({
    queryType: GetAllStudentsQuery,
    resultType: GetAllStudentQueryResult
})
export class GetAllStudentsQueryHandler implements IQueryHandler<GetAllStudentsQuery, GetAllStudentQueryResult> {

    constructor(@Inject(StudentRepository) private studentsRepositiory: StudentRepository) {

    }

    public async retrieve(query: GetAllStudentsQuery): Promise<GetAllStudentQueryResult> {
        const students = await this.studentsRepositiory.getAll();
        const mappdStudents = students.map((x: any) => Object.assign(new StudentModel(), x));

        return new GetAllStudentQueryResult(mappdStudents);
    }
}