import { IQueryResult } from "../../../../../framework/CQRS";

export class GetTokensQueryResult implements IQueryResult {
    constructor(public allTokens : {gitToken : string , fbToken : string , twToken : string}) {}
}