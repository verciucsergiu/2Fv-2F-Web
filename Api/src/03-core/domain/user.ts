import { BaseEntity } from ".";
import { Column, OneToOne, Entity } from "typeorm";

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
    private role: string;

    @Column()
    private foreignid: string;

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }
}