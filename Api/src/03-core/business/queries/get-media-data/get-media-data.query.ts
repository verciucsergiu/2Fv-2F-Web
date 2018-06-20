import { IQuery } from "../../../../../framework/CQRS";

export class GetSocialMediaQuery implements IQuery {
    constructor(public uuid : string) { }
}