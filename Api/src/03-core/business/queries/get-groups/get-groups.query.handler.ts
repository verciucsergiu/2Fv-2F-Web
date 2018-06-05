import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { GroupRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { GetGroupsQueryResult } from "./get-groups.query.result";
import {  GroupModel } from '../../models';
import { GetGroupsQuery } from "./get-groups.query";

@QueryHandler({
    queryType: GetGroupsQuery,
    resultType: GetGroupsQueryResult
})
export class GetGroupsQueryHandler implements IQueryHandler<GetGroupsQueryHandler, GetGroupsQueryResult> {
    constructor(@Inject(GroupRepository) private repository: GroupRepository) {

    }
    public async retrieve(query: GetGroupsQueryHandler): Promise<GetGroupsQueryResult> {
        const result = await this.repository.getAll();
        const mappedResult = result.map((x: GroupModel) => {
            return Object.assign(new GroupModel(), x);
        });

        return new GetGroupsQueryResult(mappedResult);
    }
}