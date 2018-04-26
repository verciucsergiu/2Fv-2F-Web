import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Professor } from '.';

@Entity()
export class Group extends BaseEntity {

    @Column({ unique: true })
    private name: string;

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

}