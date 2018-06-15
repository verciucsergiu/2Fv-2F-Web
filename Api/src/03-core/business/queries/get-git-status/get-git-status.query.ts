import { IQuery } from "../../../../../framework/CQRS";

export class GetGitStatusQuery implements IQuery {
    constructor(public studentId: string) { }
}