import { Injectable } from "../../../../framework/injector";
import { JwtHelper } from "../../../../framework/core";

@Injectable()
export class JwtFactory {
    public getToken(id: string, username: string, role: string, foreignid: string): string {
        return JwtHelper.generateToken({
            id: id,
            username: username,
            role: role,
            foreignid: foreignid
        });
    }
}