import { ServerRequest, ServerResponse, IncomingMessage } from 'http';
import { ResponseHandler } from './response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { PayloadTooLargeException } from '../server-exceptions/payload-too-large.exception';
import { NotFound, InternalServerError, Unauthorized, BadRequest } from '../http-responses';
import { Action } from '../app-container/types/action';
import { AppContainer } from '../app-container/app-container';
import { UnauthorizedException } from '../server-exceptions/unauthorized.exception';

export class RequestHandler {
    private body: any = null;

    constructor(private request: ServerRequest, private response: ServerResponse) {
        this.handle();
    }

    public handle(): void {
        const requestUrl: string = this.request.url.slice(1).toLowerCase();
        const verb: string = this.request.method.toUpperCase();
        const responseHandler: ResponseHandler = new ResponseHandler(this.response);

        const token: string = this.getTokenFromHeader(this.request.headers);

        console.log(verb + ' : ' + requestUrl);
        this.getRequestBody((notTrusted: boolean) => {
            if (notTrusted) {
                responseHandler.handle(new BadRequest("Invalid input!"));
            } else {
                try {
                    const action: Action = AppContainer.getAction(requestUrl, verb, this.body, token);
                    responseHandler.handle(action.executeAction(token));
                } catch (e) {
                    if (e instanceof NotFoundException) {
                        responseHandler.handle(new NotFound());
                    } else if (e instanceof UnauthorizedException) {
                        responseHandler.handle(new Unauthorized());
                    } else {
                        responseHandler.handle(new InternalServerError());
                    }
                }
            }
        });
    }

    private getRequestBody(callback: any): void {
        let jsonString: string = '';
        if (this.request.method.toUpperCase() !== 'GET') {
            this.request.on('data', (data) => {
                jsonString += data;
                if (jsonString.length > AppContainer.settings.maxRequestSize) {
                    jsonString = '';
                    throw new PayloadTooLargeException(
                        `Request size is larger than ${AppContainer.settings.maxRequestSize} ` +
                        `${this.request.url} -> ${this.request.method}!`);
                }
            });

            this.request.on('end', () => {
                if (jsonString.match(/<script[\s\S]*?>[\s\S]*?/gi)) {
                    callback(true);
                }
                this.body = JSON.parse(jsonString);
                callback(false);
            });
        } else {
            callback(false);
        }
    }

    private getTokenFromHeader(headers: any): string {
        if (headers.authorization) {
            return headers.authorization;
        }

        return '';
    }
}