import { IQueryResult } from "../../../../../framework/CQRS";
import { ProfessorModel } from "../..";

export class GetAllProfessorsQueryResult implements IQueryResult {
    constructor(public professors: Array<ProfessorModel>) { }
}