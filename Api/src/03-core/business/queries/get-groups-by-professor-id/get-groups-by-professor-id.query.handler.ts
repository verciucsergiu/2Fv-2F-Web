import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GetGroupsByProfessorIdQuery } from "./get-groups-by-professor-id.query";
import { GetGroupsByProfessorIdQueryResult } from "./get-groups-by-professor-id.query.result";
import { GroupRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { GroupModel } from "../..";

@QueryHandler({
    queryType: GetGroupsByProfessorIdQuery,
    resultType: GetGroupsByProfessorIdQueryResult
})
export class GetGroupsByProfessorIdQueryHandler implements IQueryHandler<GetGroupsByProfessorIdQuery, GetGroupsByProfessorIdQueryResult> {

    constructor(@Inject(GroupRepository) private repository: GroupRepository) {

    }
    public async retrieve(query: GetGroupsByProfessorIdQuery): Promise<GetGroupsByProfessorIdQueryResult> {
        const result = await this.repository.getAllByOption(query.id);
        const mappedResult = result.map((st: GroupModel) => Object.assign(new GroupModel(), st));
        return new GetGroupsByProfessorIdQueryResult(mappedResult);
    }
}