import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { AddGroupToProfessorCommand } from ".";
import { GroupRepository, ProfessorRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { GroupModel, ProfessorModel } from "../..";
import { Group, Professor } from "../../..";

@CommandHandler({ commandType: AddGroupToProfessorCommand })
export class AddGroupToProfessorCommandHandler implements ICommandHandler<AddGroupToProfessorCommand> {
    constructor(@Inject(GroupRepository) private groupRepository: GroupRepository,
                @Inject(ProfessorRepository) private professorRepository: ProfessorRepository) { }

    public async handle(command: AddGroupToProfessorCommand): Promise<void> {

        const group: any = await this.groupRepository.getById(command.assignModel.groupId);
        const professor: any = await this.professorRepository.getProfessorWithGroupRelations(command.professorId);
        professor.groups.push(group);
        await this.professorRepository.add(professor);
    }
}