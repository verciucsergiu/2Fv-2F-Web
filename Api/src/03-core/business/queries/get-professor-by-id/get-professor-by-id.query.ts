import { IQuery } from "../../../../../framework/CQRS";

export class GetProfessorByIdQuery implements IQuery {
    constructor(public id: string) { }
}