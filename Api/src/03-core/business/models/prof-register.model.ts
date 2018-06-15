import { UserRole } from "../../domain/user-role.enum";

export class ProfRegisterModel {
    public username: string;
    public firstname: string;
    public lastname: string;
    public password: string;
    public email: string;
    public cnp: string;
    public role: UserRole;
}