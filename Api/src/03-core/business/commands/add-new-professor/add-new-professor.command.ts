import { ProfessorModel } from '../../models/professor.model';
import { ICommand } from '../../../../../framework/CQRS';

export class AddNewProfessorCommand implements ICommand {
    constructor(public professorModel: ProfessorModel) { }
}