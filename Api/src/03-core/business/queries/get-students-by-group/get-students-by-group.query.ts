import { IQuery } from "../../../../../framework/CQRS";

export class GetStudentsByGroupQuery implements IQuery {
    constructor(public group: string) { }
}