import { ICommand } from '../../../../../framework/CQRS';

export class AddGitHubMarkCommand implements ICommand {
    constructor(public uuid: string) { }
}