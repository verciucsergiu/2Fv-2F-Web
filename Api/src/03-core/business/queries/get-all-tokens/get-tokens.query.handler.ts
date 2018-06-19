import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";
import { GetTokensQuery, GetTokensQueryResult } from "../get-all-tokens";

@QueryHandler({
    queryType: GetTokensQuery,
    resultType: GetTokensQueryResult
})
export class GetTokensQueryHandler implements IQueryHandler<GetTokensQuery, GetTokensQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    public async retrieve(query: GetTokensQuery): Promise<GetTokensQueryResult> {
        const students: any = await this.repository.getById(query.uuid);
        const result : any = new Object();
        result.gitToken = "true";
        result.fbToken = "true";
        result.twToken = "true";
        if (students.gitToken === "") {
            result.gitToken = "false";
        }
        if (students.fbToken === "") {
            result.fbToken = "false";
        }
        if (students.twToken === "") {
            result.twToken = "false";
        }
        return new GetTokensQueryResult(result);
    }
}
