import { IQuery } from "../../../../../framework/CQRS";

export class GetGroupByIdQuery implements IQuery {
    constructor(public id: string) { }
}