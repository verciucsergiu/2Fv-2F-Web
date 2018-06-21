import { Entity, Column, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AttendanceComments } from './attendance-comments';
@Entity()
export class Student extends BaseEntity {

    @Column()
    private firstName: string;

    @Column()
    private lastName: string;

    @Column()
    private group: string;

    @Column()
    private cnp: string;

    @Column()
    private deleted?: boolean = false;

    @Column()
    private gitToken: string = '';

    @Column()
    private fbToken: string = '';

    @Column()
    private fbUserId: string = '';

    @Column()
    private lnToken1: string = '';

    @Column()
    private lnToken2: string = '';

    @Column()
    private fbPoints: number = 0;

    @Column()
    private classesMark : number = 0;
    @Column()
    private gitMark : number = 0;

    @Column()
    private linkedinMark : number = 0;

    @Column()
    private finalMark : number = 0;

    @Column()
    private willPromote : string = "No";

    @Column()
    private twitterMark : number = 0;
    @OneToMany((type) => AttendanceComments, (attendanceComments) => attendanceComments.student)
    public attendanceComments: Array<AttendanceComments> = new Array<AttendanceComments>();
    public markAsDeleted(): void {
        this.deleted = true;
    }

    public setGitToken(token: string): void {
        this.gitToken = token;
    }

    public getGitToken(): string {
        return this.gitToken;
    }

    public setFbToken(token: string): void {
        this.fbToken = token;
    }

    public getFbToken(): string {
        return this.fbToken;
    }

    public setFbUserId(id: string): void {
        this.fbUserId = id;
    }

    public getFbUserId(): string {
        return this.fbUserId;
    }

    public setFbPoits(value: number): void {
        this.fbPoints = value;
    }
}