import { ICommand } from '../../../../../framework/CQRS';

export class AddLinkedInMarkCommand implements ICommand {
    constructor(public uuid: string) { }
}