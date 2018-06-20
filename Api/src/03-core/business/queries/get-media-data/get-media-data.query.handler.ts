import { QueryHandler, IQueryHandler, CommandDispatcher } from "../../../../../framework/CQRS";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";
import { GetSocialMediaQuery, GetSocialMediaQueryResult } from "../get-media-data";
import { MediaData } from "../../models";
import * as request from "superagent";
import { AddGitHubMarkCommand } from "../../commands/add-gitHub-mark";
@QueryHandler({
    queryType: GetSocialMediaQuery,
    resultType: GetSocialMediaQueryResult
})
export class GetSocialMediaQueryHandler implements IQueryHandler<GetSocialMediaQuery, GetSocialMediaQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository,
                @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher) {
    }
    private currentGitUser: any = "";
    public async retrieve(query: GetSocialMediaQuery): Promise<GetSocialMediaQueryResult> {
        const student: any = await this.repository.getById(query.uuid);
        const resultData: MediaData = new MediaData();
        const result: any = "";
        if (student.gitToken !== "") {
            const command = new AddGitHubMarkCommand(query.uuid);
            await this.commandDispatcher.dispatchAsync(command);
        }
        return new GetSocialMediaQueryResult();
    }
}
