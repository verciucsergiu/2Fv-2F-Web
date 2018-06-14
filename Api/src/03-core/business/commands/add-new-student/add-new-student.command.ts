import { ICommand } from "../../../../../framework/CQRS";
import { StudentModel } from "../..";

export class AddNewStudentCommand implements ICommand {
    constructor(public studentModel: StudentModel) { }
}