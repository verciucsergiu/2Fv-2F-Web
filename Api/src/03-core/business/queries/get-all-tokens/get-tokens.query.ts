import { IQuery } from "../../../../../framework/CQRS";

export class GetTokensQuery implements IQuery {
    constructor(public uuid : string) { }
}