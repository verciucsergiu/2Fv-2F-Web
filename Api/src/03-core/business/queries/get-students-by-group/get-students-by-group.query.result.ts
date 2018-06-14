import { IQueryResult } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class GetStudentsByGroupQueryResult implements IQueryResult {
    constructor(public students: Array<StudentModel>) {
    }
}