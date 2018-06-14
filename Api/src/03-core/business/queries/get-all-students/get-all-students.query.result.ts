import { IQueryResult } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class GetAllStudentsQueryResult implements IQueryResult {
    constructor(public students: StudentModel[]) { }
}