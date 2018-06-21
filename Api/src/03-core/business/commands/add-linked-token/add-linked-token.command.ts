import { ICommand } from '../../../../../framework/CQRS';

export class AddLinkedTokenCommand implements ICommand {
    constructor(public token: string, public uuid: string) { }
}