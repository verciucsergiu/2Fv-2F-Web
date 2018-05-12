import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { ProfessorRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { ProfessorModel, GetAllProfessorsQueryResult } from "../..";
import { GetAllProfessorsQuery } from "./get-all-professors.query";

@QueryHandler({
    queryType: GetAllProfessorsQuery,
    resultType: GetAllProfessorsQueryResult
})
export class GetAllProfessorsQueryHandler implements IQueryHandler<GetAllProfessorsQuery, GetAllProfessorsQueryResult> {
    constructor(@Inject(ProfessorRepository) private professorRepository: ProfessorRepository) {

    }

    public async retrieve(query: GetAllProfessorsQuery): Promise<GetAllProfessorsQueryResult> {
        const result = await this.professorRepository.getAllWithGroupRelations();
        const professorsMapped: Array<ProfessorModel> = result.map((pf: ProfessorModel) => Object.assign(new ProfessorModel(), pf));

        return new GetAllProfessorsQueryResult(professorsMapped);
    }
}