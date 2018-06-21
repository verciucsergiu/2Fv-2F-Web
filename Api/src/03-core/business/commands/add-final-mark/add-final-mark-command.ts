import { ICommand } from '../../../../../framework/CQRS';

export class AddFinalMarkCommand implements ICommand {
    constructor(public uuid: string) { }
}