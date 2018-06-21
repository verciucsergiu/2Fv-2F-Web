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
        await request
            .get("https://api.linkedin.com/v1/people/~?format=json")
            /* .send({
                 owner: "urn:li:person:324_kGGaLE",
                 text: {
                   text: "Test Share!"
                 },
                 subject: "Test Share Subject",
                 distribution: {
                   linkedInDistributionTarget: {}
                 },
                 content: {
                   contentEntities: [
                     {
                       entityLocation: "https://www.example.com/content.html",
                       thumbnails: [
                         {
                           resolvedUrl: "https://www.example.com/image.jpg"
                         }
                       ]
                     }
                   ],
                   title: "Test Share with Content"
                 }
               })*/
            .set('Authorization', 'Bearer ' + student.lnToken1 + student.lnToken2)
            .set('Content-Type', 'application/json')
            .then((result) => {
                if (result.body.headline === "Programator" || result.body.headline === "Developer"
                    || result.body.headline === "WebDeveloper") {
                    student.linkedinMark = 1;
                }
            }).catch((err) => {
                student.lnToken1 = "";
                student.lnToken2 = "";
            });
        await this.studentRepository.update(student);
    }
}