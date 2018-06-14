import { CommandHandler, ICommandHandler } from "../../../../../framework/CQRS";
import { LoginUserCommand } from "./login-user.command";
import { UserService } from "../../utils/user.service";
import { Inject } from "../../../../../framework/injector";
import { JwtFactory } from "../../utils/jwt-factory.service";
import { UserRepository } from "../../../../02-persistance/user.repository";
import { User } from "../../..";

@CommandHandler({
    commandType: LoginUserCommand
})
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(JwtFactory) private jwtFactory: JwtFactory,
        @Inject(UserRepository) private userRepository: UserRepository
    ) {

    }

    public async handle(command: LoginUserCommand): Promise<void> {
        const isValid = await this.userService.isUserValid(command.loginModel);
        if (!isValid) {
            command.success = false;
            return;
        } else {
            command.success = true;
            const user: any = await this.userRepository.getByUsername(command.loginModel.username);
            const userAsEntity: User = Object.assign(new User(), user);
            const token = this.jwtFactory.getToken(userAsEntity.id, command.loginModel.username, userAsEntity.getRoleAsString());
            command.token = token;
        }
    }
}