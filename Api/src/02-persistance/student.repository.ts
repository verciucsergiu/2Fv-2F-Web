import { Injectable, Inject } from "../../framework/injector";
import { Student } from "../03-core/domain/student";
import { BaseRepository } from "./base.repository";
import { DatabaseContext } from ".";

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
    protected type: Function = Student;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }

    public async getStudentsWithAttendance(receivedGroup: string): Promise<Array<{}>> {
        const dbSet = await this.dbSet();
        // return dbSet.find();
        // return dbSet.find({ where: { deleted: false, group: receivedGroup}});
        return dbSet.find({ relations: ["attendanceComments"], where: { deleted: false, group: receivedGroup } });
    }

    public async getStudents(recievedGroup: string): Promise<Array<{}>> {
        const dbSet = await this.dbSet();
        return dbSet.find({ where: { deleted: false, group: recievedGroup } });
    }

    public async getStudentByCNP(targetcnp: string): Promise<{}> {
        const dbSet = await this.dbSet();
        return dbSet.findOne({ where: { deleted: false, cnp: targetcnp } });
    }
}