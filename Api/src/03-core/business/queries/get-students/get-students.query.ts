import { IQuery } from "../../../../../framework/CQRS";

export class GetStudentsQuery implements IQuery {
    constructor(public group: string) { }
}