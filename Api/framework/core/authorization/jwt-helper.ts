import * as jwt from 'jsonwebtoken';
import { AppContainer } from '../app-container/app-container';

export class JwtHelper {
    public static generateToken(tokenToEncode: any): string {
        return jwt.sign(tokenToEncode, AppContainer.jwtSigningKey);
    }

    public static getPrincipal(token: string): any {
        return jwt.decode(token);
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