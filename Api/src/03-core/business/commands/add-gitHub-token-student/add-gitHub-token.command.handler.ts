import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository } from '../../../../02-persistance';
import { AddGitHubTokenCommand } from '../add-gitHub-token-student';
import { Student } from '../../../domain/student';
@CommandHandler({ commandType: AddGitHubTokenCommand })
export class AddGitHubTokenCommandHandler implements ICommandHandler<AddGitHubTokenCommand> {

    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {
    }

    public async handle(command: AddGitHubTokenCommand): Promise<void> {
        const student: any = await this.studentRepository.getById(command.uuid);
        student.gitToken = command.token;
        await this.studentRepository.update(student);
    }
}
