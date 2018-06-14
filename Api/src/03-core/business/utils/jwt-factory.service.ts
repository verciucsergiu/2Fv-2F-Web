import { Injectable } from "../../../../framework/injector";
import * as JwtHelper from 'jsonwebtoken';

@Injectable()
export class JwtFactory {
    public getToken(id: string, username: string, role: string): string {
        return JwtHelper.sign({
            id: id,
            username: username,
            role: role
        }, 'c1b05003-6218-488c-876f-ee819c7461ef');
    }
}