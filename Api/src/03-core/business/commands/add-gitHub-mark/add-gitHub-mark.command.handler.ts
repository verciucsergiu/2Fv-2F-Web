import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { Injectable, Inject } from '../../../../../framework/injector';
import { AttendanceComments } from '../../../domain/attendance-comments';
import { StudentRepository } from '../../../../02-persistance';
import { AddGitHubMarkCommand } from '../add-gitHub-mark';
import { Student } from '../../../domain/student';
import * as request from "superagent";
const REFFERENCECOMMITSNUMBER: number = 7;
const REFFERENCELANGUAGES: string[] = ["CSS", "HTML", "TypeScript", "JavaScript", "PHP"];
@CommandHandler({ commandType: AddGitHubMarkCommand })
export class AddGitHubMarkCommandHandler implements ICommandHandler<AddGitHubMarkCommand> {

    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {
    }
    private currentGitUser: any = "";
    public async handle(command: AddGitHubMarkCommand): Promise<void> {
        const student: any = await this.studentRepository.getStudentWithAttendance(command.uuid);
        let bodyJson: any;
        let contribuitorsURL: any = "";
        let languagesURL: any = "";
        let totalPoints: number = 0;
        try {
            await request
                .get("https://api.github.com/user")
                .set('Authorization', 'token ' + student.gitToken)
                .then((result) => {
                    this.currentGitUser = result.body.login;
                });
            await request
                .get("https://api.github.com/user/repos")
                .set('Authorization', 'token ' + student.gitToken)
                .then((result) => {
                    bodyJson = result.body;
                });
            for (const repo of bodyJson) {
                contribuitorsURL = repo.contributors_url;
                languagesURL = repo.languages_url;
                let specificWebLanguages: number = 0;
                let totalLanguages: number = 0;
                console.log(languagesURL);
                await request
                    .get(languagesURL)
                    .set('Authorization', 'token ' + student.gitToken)
                    .then((result) => {
                        for (const language in result.body) {
                            if (result.body.hasOwnProperty(language)) {
                                console.log(language, result.body[language]);
                                if (REFFERENCELANGUAGES.some((x: string) => x === language)) {
                                    specificWebLanguages += result.body[language];
                                }
                                totalLanguages += result.body[language];
                            }
                        }
                    });

                await request
                    .get(contribuitorsURL)
                    .set('Authorization', 'token ' + student.gitToken)
                    .then((result) => {

                        let totalRepoContributions: number = 0;
                        let currentUserRepoContributions: number = 0;
                        for (const contribuitor of result.body) {

                            totalRepoContributions = totalRepoContributions + contribuitor.contributions;
                            if (contribuitor.login === this.currentGitUser) {
                                currentUserRepoContributions = currentUserRepoContributions + contribuitor.contributions;
                            }
                        }
                        totalPoints = totalPoints + (currentUserRepoContributions / totalRepoContributions) *
                            (totalRepoContributions / REFFERENCECOMMITSNUMBER) + (currentUserRepoContributions / totalRepoContributions) *
                            (totalRepoContributions / REFFERENCECOMMITSNUMBER) * specificWebLanguages / totalLanguages;

                    });

            }
        } catch {
            student.gitToken = "";
        }
        student.gitMark = totalPoints;
        if (student.gitMark > 15) {student.gitMark = 15; }
        console.log(totalPoints);
        await this.studentRepository.update(student);
    }
}
