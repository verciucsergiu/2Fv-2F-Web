import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";
import { GetInvitationQuery } from "./get-invitation.query";
import { GetInvitationQueryResult } from "./get-invitation.query.result";
import { PendingInvitesRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { EmailModel } from "../..";

@QueryHandler({
    queryType: GetInvitationQuery,
    resultType: GetInvitationQueryResult
})
export class GetInvitationQueryHandler implements IQueryHandler<GetInvitationQuery, GetInvitationQueryResult> {
    constructor(@Inject(PendingInvitesRepository) private pendingInvitesRepository: PendingInvitesRepository) { }

    public async retrieve(query: GetInvitationQuery): Promise<GetInvitationQueryResult> {
        const result: any = await this.pendingInvitesRepository.getById(query.uid);
        let emailModel: EmailModel;
        if (result !== undefined) {
            emailModel = Object.assign(new EmailModel(), result);
        }
        return new GetInvitationQueryResult(emailModel);
    }
}