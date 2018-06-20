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
        const student: any = await this.repository.getById(query.uuid);
        const result : any = new Object();
        result.gitToken = "true";
        result.fbToken = "true";
        result.twToken = "true";
        if (student.gitToken === "") {
            result.gitToken = "false";
        }
        if (student.fbToken === "") {
            result.fbToken = "false";
        }
        if (student.twToken === "") {
            result.twToken = "false";
        }
        return new GetTokensQueryResult(result);
    }
}
