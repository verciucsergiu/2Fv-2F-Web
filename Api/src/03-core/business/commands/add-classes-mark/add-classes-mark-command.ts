import { ICommand } from '../../../../../framework/CQRS';

export class AddClassesMarkCommand implements ICommand {
    constructor(public uuid: string) { }
}