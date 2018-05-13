import { ICommandHandler, CommandHandler } from "../../../../../framework/CQRS";
import { ProfessorRepository, GroupRepository } from "../../../../02-persistance";
import { Inject } from "../../../../../framework/injector";
import { RemoveGroupFromProfessor } from ".";

@CommandHandler({
    commandType: RemoveGroupFromProfessor
})
export class RemoveGroupFromProfessorHandler implements ICommandHandler<RemoveGroupFromProfessor> {
    constructor(
        @Inject(ProfessorRepository) private professorRepository: ProfessorRepository,
        @Inject(GroupRepository) private groupRepository: GroupRepository) { }

    public async handle(command: RemoveGroupFromProfessor): Promise<void> {
        const group: any = await this.groupRepository.getById(command.assignModel.groupId);
        const professor: any = await this.professorRepository.getProfessorWithGroupRelations(command.professorId);

        for (const i in professor.groups) {
            if (group.id === professor.groups[i].id) {
                professor.groups.splice(i, 1);
                break;
            }
        }

        this.professorRepository.update(professor);
    }
}