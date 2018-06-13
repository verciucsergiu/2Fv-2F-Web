import { Entity, Column, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Student } from './student';

@Entity()
export class AttendanceComments extends BaseEntity {

    @Column()
    private weekNumber: number;

    @Column()
    private comment: string = '';

    @Column()
    private value: string = '';

    @Column()
    private deleted?: boolean = false;

    @ManyToOne((type) => Student, (student) => student.id)
    private student : Student;

}