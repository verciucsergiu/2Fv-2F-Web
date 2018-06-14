import { BaseEntity } from ".";
import { Column, OneToOne, Entity } from "typeorm";
import { UserRole } from "./user-role.enum";

@Entity()
export class User extends BaseEntity {

    @Column()
    private username: string;

    @Column()
    private password: string;

    @Column()
    private email: string;

    @Column()
    private cnp: string;

    @Column()
    private role: UserRole;

    @Column()
    private foreignid: string;

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

    public setFK(fk: string) {
        this.foreignid = fk;
    }

    public getRoleAsString(): string {
        return UserRole[this.role];
    }

    public getForeignid(): string {
        return this.foreignid;
    }
}