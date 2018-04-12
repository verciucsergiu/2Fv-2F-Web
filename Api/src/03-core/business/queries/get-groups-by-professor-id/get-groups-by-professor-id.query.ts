import { IQuery } from "../../../../../framework/CQRS";

export class GetGroupsByProfessorIdQuery implements IQuery {
    constructor(public id: string) { }
}