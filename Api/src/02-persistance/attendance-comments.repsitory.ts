import { AttendanceComments } from "../03-core/domain/attendance-comments";
import { Injectable, Inject } from "../../framework/injector";
import { BaseRepository } from "./base.repository";
import { DatabaseContext } from ".";
import { Student } from "../03-core/domain/student";
@Injectable()
export class AttendanceCommentsRepository extends BaseRepository<AttendanceComments> {
    protected type: Function = AttendanceComments;
    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }
    public async getAttendance(uuid: string, week: number): Promise<{}> {
        const dbSet = await this.dbSet();
        return dbSet.findOne({ where: { deleted: false, studentId: uuid, weekNumber: week } });
    }
}