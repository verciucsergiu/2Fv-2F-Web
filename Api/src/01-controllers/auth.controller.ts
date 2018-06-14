import { Controller, HttpPost, Ok, FromBody, IActionResult, BadRequest } from "../../framework/core";
import { Inject } from "../../framework/injector/decorators/inject";
import { CommandDispatcher } from "../../framework/CQRS/command.dispatcher";
import { QueryDispatcher } from "../../framework/CQRS/query.dispatcher";
import { LoginModel } from "../03-core/business/models/login.model";
import { RegisterModel } from "../03-core/business/models/register.model";
import { RegisterProfessorCommand, RegisterUserCommand } from "../03-core/business";
import { LoginUserCommand } from "../03-core/business/commands/login-user/login-user.command";
import { UserRole } from "../03-core/domain/user-role.enum";

@Controller('api/auth')
export class AuthController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpPost('login')
    public async loginAs(@FromBody() loginModel: LoginModel): Promise<IActionResult> {
        const command = new LoginUserCommand(loginModel);
        await this.commandDispatcher.dispatchAsync(command);

        if (command.success) {
            return new Ok({ auth_token: command.token });
        }

        return new BadRequest("Invalid credentials!");
    }

    @HttpPost('register')
    public async registerAs(@FromBody() registerModel: RegisterModel): Promise<IActionResult> {
        const command = new RegisterUserCommand(registerModel);
        await this.commandDispatcher.dispatchAsync(command);
        return new Ok();
    }

    @HttpPost('register/professor')
    public async registerProfessorAs(@FromBody() registerModel: RegisterModel): Promise<IActionResult> {
        const command = new RegisterProfessorCommand(registerModel);
        await this.commandDispatcher.dispatchAsync(command);
        return new Ok();
    }
}