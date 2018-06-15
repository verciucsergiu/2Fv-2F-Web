import * as http from 'http';
import { DependencyContainer } from '../injector';
import { RequestHandler } from './handlers/request-handler';
import { DecoratorHandler } from './decorators/decorators-handler';
import { AppContainer } from './app-container/app-container';
import { AppParams } from './decorators/models/app-params.model';
import { JwtAuthorizationOptions } from './authorization';

export class WebApiBuilder {
    private startupClass: any;

    constructor() {
    }

    public run(): void {
        const settings: AppParams = AppContainer.settings;
        DecoratorHandler.handle();
        http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
            this.handleCors(request, response, () => {
                new RequestHandler(request, response);
            });
        }).listen(settings.port);

        console.log('Server is up and running at : http://localhost:' + settings.port);
    }

    public useStartupClass(startup: any): WebApiBuilder {
        this.startupClass = startup;
        return this;
    }

    public useDatabase(type: Function, database: any): WebApiBuilder {
        DependencyContainer.set({ global: true, value: database, type: type });
        return this;
    }

    public useJwtAuthorization(jwtOptions: JwtAuthorizationOptions): WebApiBuilder {
        AppContainer.jwtSigningKey = jwtOptions.signingKey;
        return this;
    }

    private handleCors(request: http.IncomingMessage, response: http.ServerResponse, next: Function): void {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Request-Method', '*');
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization');
        if (request.method === 'OPTIONS') {
            response.writeHead(200);
            response.end();
        } else {
            next();
        }
    }
}