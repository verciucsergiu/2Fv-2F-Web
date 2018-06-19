import { ICommand } from '../../../../../framework/CQRS';

export class AddGitHubTokenCommand implements ICommand {
    constructor(public token: string, public uuid: string) { }
}