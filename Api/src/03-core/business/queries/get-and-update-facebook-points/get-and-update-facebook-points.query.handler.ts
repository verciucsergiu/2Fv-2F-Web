import { Inject } from "../../../../../framework/injector";
import { IQueryHandler, QueryHandler } from "../../../../../framework/CQRS";

import * as request from "superagent";

import { GetAndUpdateFacebookPointsQuery } from "./get-and-update-facebook-points.query";
import { GetAndUpdateFacebookPointsQueryResult } from "./get-and-update-facebook-points.query.result";
import { StudentRepository } from "../../../../02-persistance";
import { Student } from "../../../domain";

@QueryHandler({
    queryType: GetAndUpdateFacebookPointsQuery,
    resultType: GetAndUpdateFacebookPointsQueryResult
})
export class GetAndUpdateFacebookPointsQueryHandler
    implements IQueryHandler<GetAndUpdateFacebookPointsQuery, GetAndUpdateFacebookPointsQueryResult> {
    constructor(@Inject(StudentRepository) private studentRepository: StudentRepository) { }

    public async retrieve(query: GetAndUpdateFacebookPointsQuery): Promise<GetAndUpdateFacebookPointsQueryResult> {
        const stud = await this.studentRepository.getById(query.studentId);
        const studAsEntity: Student = Object.assign(new Student(), stud);
        const fbEventUry = "https://graphs.facebook.com/me/events?access_token=" + studAsEntity.getFbToken();

        await request.post(fbEventUry)
            .then((result) => {
                console.log(result);
                const data = result.body;
            });
        return new GetAndUpdateFacebookPointsQueryResult(1000);
    }
}