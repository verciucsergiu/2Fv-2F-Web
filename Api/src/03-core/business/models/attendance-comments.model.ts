import { StudentModel } from "./student.model";

export class AttendanceCommentsModel {
    public weekNumber: number;
    public comment: string ;
    public value: string ;
    public student: StudentModel;
}