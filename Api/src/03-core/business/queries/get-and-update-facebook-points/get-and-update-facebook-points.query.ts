import { IQuery } from "../../../../../framework/CQRS";

export class GetAndUpdateFacebookPointsQuery implements IQuery {
    constructor(public studentId: string) { }
}