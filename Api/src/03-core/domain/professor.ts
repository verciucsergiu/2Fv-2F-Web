import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Professor extends BaseEntity {

    @Column()
    private firstName: string = '';

    @Column()
    private lastName: string = '';

    @Column()
    private email: string = '';

    @Column()
    private rank: string = '';

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public get profEmail(): string {
        return `${this.email}`;
    }

    public get profRank(): string {
        return `${this.rank}`;
    }

}