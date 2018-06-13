import { BaseEntity, Column } from "typeorm";

export class PendingInvites extends BaseEntity {
    @Column()
    private email: string;
}