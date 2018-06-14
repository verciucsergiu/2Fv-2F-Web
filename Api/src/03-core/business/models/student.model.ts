import { AttendanceCommentsModel } from ".";

export class StudentModel {
    public firstName: string;
    public lastName: string;
    public group: string;
    public cnp: string;
    public attendanceComments: Array<AttendanceCommentsModel> = new Array<AttendanceCommentsModel>();
}