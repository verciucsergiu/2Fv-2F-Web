import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GetProfessorByIdQuery, GetProfessorByIdQueryResult } from ".";
import { ProfessorRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { ProfessorModel } from "../..";

@QueryHandler({
    queryType: GetProfessorByIdQuery,
    resultType: GetProfessorByIdQueryResult
})
export class GetProfessorByIdQueryHandler implements IQueryHandler<GetProfessorByIdQuery, GetProfessorByIdQueryResult> {

    constructor(@Inject(ProfessorRepository) private repository: ProfessorRepository) {
    }

    public async retrieve(query: GetProfessorByIdQuery): Promise<GetProfessorByIdQueryResult> {
        const professor: any = await this.repository.getById(query.id);
        const professorMapped: ProfessorModel = Object.assign(new ProfessorModel(), professor);

        return new GetProfessorByIdQueryResult(professorMapped);
    }
}
