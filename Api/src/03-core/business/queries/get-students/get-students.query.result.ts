import { IQueryResult } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class GetStudentsQueryResult implements IQueryResult {
    constructor(public students: Array<StudentModel>) {
    }
}