import { UserRole } from "../../domain/user-role.enum";

export class RegisterModel {
    public username: string;
    public password: string;
    public email: string;
    public cnp: string;
    public role: UserRole;
}