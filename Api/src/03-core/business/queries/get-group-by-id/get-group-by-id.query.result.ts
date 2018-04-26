import { GroupModel } from '../../models';
import { IQueryResult } from '../../../../../framework/CQRS';

export class GetGroupByIdQueryResult implements IQueryResult {
    constructor(public group: GroupModel) {
    }
}