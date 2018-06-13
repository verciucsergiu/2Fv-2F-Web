import { Controller, HttpPost, Ok, IActionResult, FromBody, HttpGet } from "../../framework/core";
import { QueryDispatcher, CommandDispatcher } from "../../framework/CQRS";
import { Inject } from "../../framework/injector";
import { InviteProfessorCommand, EmailModel } from "../03-core/business";

@Controller("api/invitations")
export class InvitationsController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpPost('add')
    public async inviteProfessor(@FromBody() emailModel: EmailModel): Promise<IActionResult> {

        const command = new InviteProfessorCommand(emailModel);
        this.commandDispatcher.dispatchAsync(command);
        return new Ok();
    }

    @HttpGet('emails')
    public async checkExistence(@FromBody() emailModel: EmailModel): Promise<IActionResult> {
        return new Ok();
    }
}