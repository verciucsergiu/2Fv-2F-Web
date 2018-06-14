import { IQueryResult } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class GetAllStudentQueryResult implements IQueryResult {
    constructor(public students: StudentModel[]) { }
}