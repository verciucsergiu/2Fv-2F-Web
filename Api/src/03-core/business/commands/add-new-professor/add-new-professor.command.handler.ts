import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { AddNewProfessorCommand } from './add-new-professor.command';
import { Injectable, Inject } from '../../../../../framework/injector';
import { ProfessorRepository } from '../../../../02-persistance';
import { Professor } from '../../../domain';

@CommandHandler({ commandType: AddNewProfessorCommand })
export class AddNewProfessorCommandHandler implements ICommandHandler<AddNewProfessorCommand> {

    constructor(@Inject(ProfessorRepository) private repository: ProfessorRepository) { }

    public async handle(command: AddNewProfessorCommand): Promise<void> {
        const professor: Professor = Object.assign(new Professor(), command.professorModel);
        await this.repository.add(professor);
    }
}
