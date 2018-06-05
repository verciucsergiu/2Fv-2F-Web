import { GroupModel } from '../../models';
import { IQueryResult } from '../../../../../framework/CQRS';

export class GetGroupsQueryResult implements IQueryResult {
    constructor(public group: GroupModel[]) {
    }
}