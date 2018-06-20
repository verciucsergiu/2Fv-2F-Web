import { QueryHandler, IQueryHandler } from "../../../../../framework/CQRS";
import { StudentRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { StudentModel } from "../..";
import { GetSocialMediaQuery, GetSocialMediaQueryResult } from "../get-media-data";
import { MediaData } from "../../models";
import * as request from "superagent";
@QueryHandler({
    queryType: GetSocialMediaQuery,
    resultType: GetSocialMediaQueryResult
})
export class GetSocialMediaQueryHandler implements IQueryHandler<GetSocialMediaQuery, GetSocialMediaQueryResult> {
    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }
    private currentGitUser: any = "";
    public async retrieve(query: GetSocialMediaQuery): Promise<GetSocialMediaQueryResult> {
        const student: any = await this.repository.getById(query.uuid);
        const resultData: MediaData = new MediaData();
        let bodyJson: any;
        let commitsuUrl: any;
        if (student.gitToken !== "") {

            await request
                .get("https://api.github.com/user")
                .set('Authorization', 'token ' + student.gitToken)
                .then((result) => {
                    this.currentGitUser = result.body.login;
                });

            await request
                .get("https://api.github.com/user/repos")
                .set('Authorization', 'token ' + student.gitToken)
                .then((result) => {
                    bodyJson = result.body;
                    // repoUrl = result.body.repos_url;
                    // console.log(result.body);
                });
            for (const repo of bodyJson) {
                commitsuUrl = repo.commits_url.split('{/sha}')[0];
                console.log(commitsuUrl);
                await request
                    .get(commitsuUrl)
                    .set('Authorization', 'token ' + student.gitToken)
                    .then((result) => {
                        for (const commit of result.body) {
                            console.log(commit.sha);
                        }
                    });
            }

        }
        return new GetSocialMediaQueryResult(bodyJson);
    }
}
