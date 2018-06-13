import { Controller, HttpPost, Ok, FromBody, IActionResult } from "../../framework/core";
import { Inject } from "../../framework/injector/decorators/inject";
import { CommandDispatcher } from "../../framework/CQRS/command.dispatcher";
import { QueryDispatcher } from "../../framework/CQRS/query.dispatcher";
import { LoginModel } from "../03-core/business/models/login.model";
import { RegisterModel } from "../03-core/business/models/register.model";
import { RegisterUserCommand } from "../03-core/business/commands/register-user/register-user.command";

@Controller('api/auth')
export class AuthController {
    constructor(
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher,
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher) {
    }

    @HttpPost('login')
    public async loginAs(@FromBody() loginModel: LoginModel): Promise<IActionResult> {
        console.log(loginModel);
        return new Ok();
    }

    @HttpPost('register')
    public async registerAs(@FromBody() registerModel: RegisterModel): Promise<IActionResult> {
        console.log(registerModel);

        const command = new RegisterUserCommand(registerModel);
        await this.commandDispatcher.dispatchAsync(command);

        return new Ok();
    }
}