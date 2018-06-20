import {
    HttpPut,
    IActionResult,
    Ok, Controller,
    FromRoute, HttpPost,
    FromBody, NotFound,
    Created, NoContent,
    Authorize,
    HttpGet
} from "../../framework/core";
import { CommandDispatcher } from "../../framework/CQRS/command.dispatcher";
import { QueryDispatcher } from "../../framework/CQRS/query.dispatcher";
import { Inject } from "../../framework/injector";
import { UserRole } from "../03-core";
import { AddGitHubTokenCommand } from "../03-core/business/commands/add-gitHub-token-student/add-gitHub-token.command";
import * as request from "superagent";
import { ApiController } from "../../framework/core/api-controller";
import {GetTokensQuery, GetTokensQueryResult} from "../03-core/business/queries/get-all-tokens";
import {GetSocialMediaQuery, GetSocialMediaQueryResult} from "../03-core/business/queries/get-media-data";
const CLIENT_ID = "17b94e383b4d34913743";
const CLIENT_SECRET = "1ec603886d54e5ba4e630a697721a9c007160a8b";

@Controller('api/media')
export class MediaController extends ApiController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
        super();
    }
    @HttpGet('')
    public async getTokens() : Promise<IActionResult> {
        const query = new GetTokensQuery(this.principal.foreignid);
        const result = await this.queryDispatcher.dispatchAsync<GetTokensQuery, GetTokensQueryResult>(query);
        return new Ok(result.allTokens);
    }
    @HttpPut('github/{code}')
    public async generateGitToken(@FromRoute('{code}') codeFromClient: string): Promise<IActionResult> {
        let accessToken = "";
        await request.post('https://github.com/login/oauth/access_token')
            .send({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: codeFromClient
            })
            .set('Accept', 'application/json')
            .then((result) => {
                const data = result.body;
                accessToken = result.body.access_token;
            });
        console.log("Github accestoken " + accessToken);
        const command = new AddGitHubTokenCommand(accessToken, this.principal.foreignid);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpGet('data')
    public async getMediaData(): Promise<IActionResult> {
        const query = new GetSocialMediaQuery(this.principal.foreignid);
        const result = await this.queryDispatcher.dispatchAsync<GetSocialMediaQuery, GetSocialMediaQueryResult>(query);
        return new Ok(result);
   }

}