import { EmailModel } from "../..";
import { IQueryResult } from "../../../../../framework/CQRS";

export class GetInvitationQueryResult implements IQueryResult {
    constructor(public emailModel: EmailModel) { }
}