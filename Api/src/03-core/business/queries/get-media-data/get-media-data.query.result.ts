import { IQueryResult } from "../../../../../framework/CQRS";

export class GetSocialMediaQueryResult implements IQueryResult {
    constructor(public dataFromMedia : any) {}
}