import { ICommand } from "../../../../../framework/CQRS";
import { GitTokenModel } from "../../models/git-token.model";

export class AddGitTokenCommand implements ICommand {
    constructor(public gitToken: GitTokenModel, public studentId: string) { }
}