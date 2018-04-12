import { IQueryResult } from "../../../../../framework/CQRS";
import { ProfessorModel } from "../..";

export class GetProfessorByIdQueryResult implements IQueryResult {
    constructor(public professor: ProfessorModel) {
    }
}