import { Injectable, Inject } from "../../../../framework/injector";
import * as bcrypt from "bcrypt";
import { LoginModel } from "..";
import { UserRepository } from "../../../02-persistance/user.repository";
import { User } from "../..";

@Injectable()
export class UserService {
    constructor(@Inject(UserRepository) private userRepository: UserRepository) {

    }

    public getPasswordHash(password: string): string {
        const saltRounds = 8;
        return bcrypt.hashSync(password, saltRounds);
    }

    public async isUserValid(loginModel: LoginModel): Promise<boolean> {
        const user: any = await this.userRepository.getByUsername(loginModel.username);
        const userAsEntity = Object.assign(new User(), user);
        if (!user) {
            return false;
        }

        if (bcrypt.compareSync(loginModel.password, userAsEntity.password)) {
            return true;
        }

        return false;
    }
}