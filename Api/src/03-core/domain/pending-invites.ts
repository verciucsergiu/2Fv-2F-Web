import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class PendingInvites extends BaseEntity {
    @Column({ unique: true })
    private email: string;

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }
}