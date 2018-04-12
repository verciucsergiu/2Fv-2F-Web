import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { AddNewGroupCommand } from './add-new-group.command';
import { Injectable, Inject } from '../../../../../framework/injector';
import { GroupRepository } from '../../../../02-persistance';
import { Group } from '../../../domain';

@CommandHandler({ commandType: AddNewGroupCommand })
export class AddNewGroupCommandHandler implements ICommandHandler<AddNewGroupCommand> {

    constructor(@Inject(GroupRepository) private repository: GroupRepository) {
    }

    public async handle(command: AddNewGroupCommand): Promise<void> {
        const group: Group = Object.assign(new Group(), command.groupModel);
        await this.repository.add(group);
    }
}