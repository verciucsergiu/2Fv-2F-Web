import { Controller, HttpPost, Ok, IActionResult, FromBody, HttpGet, FromRoute, NotFound, Created, BadRequest } from "../../framework/core";
import { QueryDispatcher, CommandDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { InviteProfessorCommand, EmailModel } from "../03-core/business";
import { GetInvitationQuery } from "../03-core/business/queries/get-invitation/get-invitation.query";
import { GetInvitationQueryResult } from "../03-core/business/queries/get-invitation/get-invitation.query.result";
import { InviteStatus } from "../03-core/business/commands/invite-professor/invite-status.enum";
import { Authorize } from "../../framework/core/authorization/authorize.decorator";
import { UserRole } from "../03-core/domain/user-role.enum";

@Controller("api/invitations")
export class InvitationsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpPost('invite')
    @Authorize({ role: UserRole[UserRole.Admin] })
    public async inviteProfessor(@FromBody() emailModel: EmailModel): Promise<IActionResult> {
        const command = new InviteProfessorCommand(emailModel);
        await this.commandDispatcher.dispatchAsync(command);
        if (command.status === InviteStatus.UserExists) {
            return new BadRequest("Email is already used!");
        }

        return new Created();
    }

    @HttpGet('uids/{uid}')
    public async checkExistence(@FromRoute('{uid}') uid: string): Promise<IActionResult> {
        const query = new GetInvitationQuery(uid);
        const result: GetInvitationQueryResult =
            await this.queryDispatcher.dispatchAsync<GetInvitationQuery, GetInvitationQueryResult>(query);

        if (result.emailModel === undefined) { return new NotFound(); }
        return new Ok(result);
    }
}