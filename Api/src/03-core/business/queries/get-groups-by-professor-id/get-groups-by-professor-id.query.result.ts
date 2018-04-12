import { GroupModel } from '../../models';
import { IQueryResult } from '../../../../../framework/CQRS';

export class GetGroupsByProfessorIdQueryResult implements IQueryResult {
    constructor(public groups: Array<GroupModel>) {
    }
}