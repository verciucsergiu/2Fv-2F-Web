import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Group extends BaseEntity {

    @Column()
    private name: string = '';

    @Column()
    private professorId: string = '';

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

}