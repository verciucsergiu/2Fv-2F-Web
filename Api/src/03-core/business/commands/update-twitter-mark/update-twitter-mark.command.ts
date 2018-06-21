import { ICommand } from "../../../../../framework/CQRS";
import { TwitterUpdateModel } from "../..";

export class UpdateTwitterMarkCommand implements ICommand {
    constructor(public twitterModel: TwitterUpdateModel) { }
}