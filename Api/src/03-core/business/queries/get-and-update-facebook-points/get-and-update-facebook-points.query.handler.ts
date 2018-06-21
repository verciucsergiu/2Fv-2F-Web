import { Inject } from "../../../../../framework/injector";
import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";

import * as request from "superagent";

import { GetAndUpdateFacebookPointsQuery } from "./get-and-update-facebook-points.query";
import { GetAndUpdateFacebookPointsQueryResult } from "./get-and-update-facebook-points.query.result";
import { StudentRepository } from "../../../../02-persistance";
import { Student } from "../../../domain";
import { KEYWORDS } from "./keywords.resources";

const MAXPOINTS: number = 10;
const PROCENTLOSSPERWORD: number = 0.75;

@QueryHandler({
    queryType: GetAndUpdateFacebookPointsQuery,
    resultType: GetAndUpdateFacebookPointsQueryResult
})
export class GetAndUpdateFacebookPointsQueryHandler
    implements IQueryHandler<GetAndUpdateFacebookPointsQuery, GetAndUpdateFacebookPointsQueryResult> {

    private points: number = 0;
    private keyworks: any[] = KEYWORDS;

    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) {
        for (const item of this.keyworks) {
            item.value = 1.5;
        }
    }

    public async retrieve(query: GetAndUpdateFacebookPointsQuery): Promise<GetAndUpdateFacebookPointsQueryResult> {
        const stud = await this.studentRepository.getStudentWithAttendance(query.studentId);
        const studAsEntity: Student = Object.assign(new Student(), stud);
        await this.getFacebookResourceDataIntoConsideration('likes', studAsEntity.getFbToken());
        await this.getFacebookResourceDataIntoConsideration('groups', studAsEntity.getFbToken());
        studAsEntity.setFbMark(this.points);
        await this.studentRepository.update(studAsEntity);
        return new GetAndUpdateFacebookPointsQueryResult(this.points);
    }

    private async getFacebookResourceDataIntoConsideration(resourceName: string, token: string): Promise<void> {
        const uri = "https://graph.facebook.com/v3.0/me?access_token=" + token + "&fields=" + resourceName;
        await this.getData(uri, resourceName);
    }

    private async getData(uri: string, resourceName: string): Promise<void> {
        await request.get(uri)
            .then(async (result) => {
                const parsedResult = JSON.parse(result.text);
                let resources;
                let next;
                if (parsedResult[resourceName]) {
                    resources = parsedResult[resourceName].data;
                    next = parsedResult[resourceName]['paging']['next'];
                } else {
                    resources = parsedResult.data;
                    next = parsedResult['paging']['next'];
                }
                let stop: boolean = false;
                for (const item of resources) {
                    this.tryMatchForNameWithKeywords(item.name);
                    if (this.points === MAXPOINTS) {
                        stop = true;
                        break;
                    }
                }

                if (next && !stop) {
                    await this.getData(next, resourceName);
                }
            }).catch((err) => {
            });
    }

    private tryMatchForNameWithKeywords(like: string): void {
        const keywords: any[] = this.keyworks.filter((x: any) => like.toLowerCase().indexOf(x.name) !== -1);
        if (keywords.length > 0) {
            const maxPointsPossible = Math.max(...keywords.map((o) => o.value));
            const word = keywords.find((x) => x.value === maxPointsPossible);
            this.points += maxPointsPossible;
            const wordToModify = this.keyworks.find((x) => x === word);
            wordToModify.value = wordToModify.value * PROCENTLOSSPERWORD;
        }
    }
}
