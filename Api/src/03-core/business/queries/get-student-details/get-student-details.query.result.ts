import { IQueryResult } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class GetStudentDetailsQueryResult implements IQueryResult {
    constructor(public student: StudentModel) { }
}