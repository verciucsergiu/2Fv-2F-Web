import { IQuery } from "../../../../../framework/CQRS";

export class GetInvitationQuery implements IQuery {
    constructor(public uid: string) { }
}