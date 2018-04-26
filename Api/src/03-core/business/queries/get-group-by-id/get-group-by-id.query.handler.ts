import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GroupRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { GroupModel } from "../..";
import { GetGroupByIdQueryResult } from "./get-group-by-id.query.result";
import { GetGroupByIdQuery } from "./get-group-by-id.query";

@QueryHandler({
    queryType: GetGroupByIdQuery,
    resultType: GetGroupByIdQueryResult
})
export class GetGroupByIdQueryHandler implements IQueryHandler<GetGroupByIdQuery, GetGroupByIdQueryResult> {

    constructor(@Inject(GroupRepository) private repository: GroupRepository) {

    }
    public async retrieve(query: GetGroupByIdQuery): Promise<GetGroupByIdQueryResult> {
        const result = await this.repository.getById(query.id);
        const mappedResult = Object.assign(new GroupModel(), result);
        return new GetGroupByIdQueryResult(mappedResult);
    }
}