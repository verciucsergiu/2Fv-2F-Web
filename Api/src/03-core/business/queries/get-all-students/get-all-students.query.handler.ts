import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { GetAllStudentsQuery } from "./get-all-students.query";
import { GetAllStudentsQueryResult } from "./get-all-students.query.result";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";

@QueryHandler({
    queryType: GetAllStudentsQuery,
    resultType: GetAllStudentsQueryResult
})
export class GetAllStudentsQueryHandler implements IQueryHandler<GetAllStudentsQuery, GetAllStudentsQueryResult> {

    constructor(@Inject(StudentRepository) private studentsRepositiory: StudentRepository) {

    }

    public async retrieve(query: GetAllStudentsQuery): Promise<GetAllStudentsQueryResult> {
        const students = await this.studentsRepositiory.getAll();
        const mappdStudents = students.map((x: any) => Object.assign(new StudentModel(), x));

        return new GetAllStudentsQueryResult(mappdStudents);
    }
}