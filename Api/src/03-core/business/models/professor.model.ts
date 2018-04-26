import { GroupModel } from ".";

export class ProfessorModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public rank: string;
    public groups: Array<GroupModel> = new Array<GroupModel>();
}