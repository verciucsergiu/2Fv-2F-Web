import { QueryHandler, IQueryHandler, CommandDispatcher, QueryDispatcher } from "../../../../../framework/CQRS";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { GetSocialMediaQuery, GetSocialMediaQueryResult } from "../get-media-data";
import { MediaData } from "../../models";
import { AddGitHubMarkCommand } from "../../commands/add-gitHub-mark";
import { AddClassesMarkCommand } from "../../commands/add-classes-mark/add-classes-mark-command";
import { AddFinalMarkCommand, AddLinkedInMarkCommand } from "../../commands";
import { GetAndUpdateFacebookPointsQuery, GetAndUpdateFacebookPointsQueryResult } from "../get-and-update-facebook-points";
@QueryHandler({
    queryType: GetSocialMediaQuery,
    resultType: GetSocialMediaQueryResult
})
export class GetSocialMediaQueryHandler implements IQueryHandler<GetSocialMediaQuery, GetSocialMediaQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository,
                @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
                @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }
    private currentGitUser: any = "";
    public async retrieve(query: GetSocialMediaQuery): Promise<GetSocialMediaQueryResult> {
        const student: any = await this.repository.getById(query.uuid);
        const resultData: MediaData = new MediaData();
        const result: any = "";
        const classesMarkCommand = new AddClassesMarkCommand(query.uuid);
        await this.commandDispatcher.dispatchAsync(classesMarkCommand);

        if (student.gitToken !== "") {
            const gitMarkCommand = new AddGitHubMarkCommand(query.uuid);
            await this.commandDispatcher.dispatchAsync(gitMarkCommand);
        }
        if (student.fbToken !== "") {
            const q = new GetAndUpdateFacebookPointsQuery(query.uuid);
            await this.queryDispatcher.dispatchAsync<GetAndUpdateFacebookPointsQuery, GetAndUpdateFacebookPointsQueryResult>(q);
        }
        if (student.lnToken !== "") {
            const lnMarkCommand = new AddLinkedInMarkCommand(query.uuid);
            await this.commandDispatcher.dispatchAsync(lnMarkCommand);
        }
        const finalMarkCommand = new AddFinalMarkCommand(query.uuid);
        await this.commandDispatcher.dispatchAsync(finalMarkCommand);

        return new GetSocialMediaQueryResult();
    }
}
