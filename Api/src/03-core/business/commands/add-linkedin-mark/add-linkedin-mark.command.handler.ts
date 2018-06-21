import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository } from '../../../../02-persistance';
import { AddGitHubMarkCommand } from '../add-gitHub-mark';
import { Student } from '../../../domain/student';
import * as request from "superagent";
import { AddLinkedInMarkCommand } from './add-linkedin-mark.command';
@CommandHandler({ commandType: AddLinkedInMarkCommand })
export class AddLinkedInMarkCommandHandler implements ICommandHandler<AddLinkedInMarkCommand> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {
    }
    public async handle(command: AddLinkedInMarkCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        console.log("lk token " + student.lnToken1 + student.lnToken2);
        //  try {
        await request
            .get("https://api.linkedin.com/v2/people/~")
            .set('Authorization', 'Bearer ' + student.lnToken1 + student.lnToken2)
            .set('Content-Type', 'application/json')
            .then((result) => {
                console.log(result.body);
            });
        // } catch {
        //     student.lnToken1 = "";
        //    student.lnToken2 = "";
        //     await this.studentRepository.update(student);
        //  }

    }
}