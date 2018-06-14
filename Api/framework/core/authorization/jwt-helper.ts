import * as jwt from 'jsonwebtoken';
import { AppContainer } from '../app-container/app-container';

export class JwtHelper {
    public static generateToken(tokenToEncode: any): string {
        return jwt.sign(tokenToEncode, AppContainer.jwtSigningKey);
    }

    public static getPrincipal(token: string): any {
        if (this.verify(token)) {
            return jwt.decode(token);
        }
        return { };
    }

    public static verify(token: string): boolean {
        try {
            jwt.verify(token, AppContainer.jwtSigningKey);
            return true;
        } catch (err) {
            return false;
        }
    }
}