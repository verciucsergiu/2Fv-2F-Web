import { Injectable, Inject } from "../../framework/injector";
import { Group } from "../03-core";
import { BaseRepository } from "./base.repository";
import { DatabaseContext } from ".";

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
    protected type: Function = Group;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }
}