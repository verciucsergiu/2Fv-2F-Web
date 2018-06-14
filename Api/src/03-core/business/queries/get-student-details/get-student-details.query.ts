import { IQuery } from "../../../../../framework/CQRS";

export class GetStudentDetailsQuery implements IQuery {
    constructor(public studentId: string) { }
}