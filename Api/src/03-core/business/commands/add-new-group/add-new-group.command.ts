import { GroupModel } from '../../models/group.model';
import { ICommand } from '../../../../../framework/CQRS';

export class AddNewGroupCommand implements ICommand {
    constructor(public groupModel: GroupModel) { }
}