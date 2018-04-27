import { Injectable, Inject } from "../../framework/injector";
import { BaseRepository } from "./base.repository";
import { DatabaseContext } from "./database-context";
import { Professor } from "../03-core";

@Injectable()
export class ProfessorRepository extends BaseRepository<Professor> {
    protected type: Function = Professor;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }

    public async getProfessorWithGroupRelations(id: string): Promise<{}> {
        const dbSet = await this.dbSet();
        return dbSet.findOneById(id, { relations: ["groups"] });
    }
}