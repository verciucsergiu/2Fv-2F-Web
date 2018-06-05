import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id: string;
}