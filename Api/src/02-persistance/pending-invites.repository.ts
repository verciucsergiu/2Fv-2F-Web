import { BaseRepository } from "./base.repository";
import { PendingInvites } from "../03-core";
import { Injectable, Inject } from "../../framework/injector";
import { DatabaseContext } from ".";

@Injectable()
export class PendingInvitesRepository extends BaseRepository<PendingInvites> {
    protected type: Function = PendingInvites;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }
}