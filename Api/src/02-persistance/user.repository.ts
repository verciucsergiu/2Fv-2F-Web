import { BaseRepository } from "./base.repository";
import { User } from "../03-core";
import { Injectable, Inject } from "../../framework/injector";
import { DatabaseContext } from ".";

@Injectable()
export class UserRepository extends BaseRepository<User> {
    protected type: Function = User;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }

    public async getByUsername(username: string): Promise<{}> {
        const dbSet = await this.dbSet();
        return dbSet.findOne({ where: { username: username }});
    }
}