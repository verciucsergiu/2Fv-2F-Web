import { IQueryResult } from "../../../../../framework/CQRS";

export class GetAndUpdateFacebookPointsQueryResult implements IQueryResult {
    constructor(public points: number) { }
}