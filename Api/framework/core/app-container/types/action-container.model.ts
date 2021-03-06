import { ActionParameter } from './action-parameter.model';
import { ParameterType } from './parameter.type';
import { UrlParser } from '../url-parser.helper';
import { JwtAuthorizationAttributeMetadata } from '../../authorization/jwt-authorization-attribute.metadata';
import { JwtHelper } from '../..';

export class ActionContainer {
    private routes: Array<string> = new Array<string>();
    private actionParams: Array<ActionParameter> = new Array<ActionParameter>();
    private authorizedRole: Array<string> = new Array<string>();

    constructor(
        route: string,
        private verb: string,
        public method: any,
        public propKey: string) {

        this.routes = UrlParser.parse(route);
    }

    public getActionParams(routes: Array<string>, requestBody: any): Array<any> {
        const paramsValues: Array<string> = this.getParamsFromRoute(routes);
        const actualParams: Array<string> = new Array<string>();
        let currentParamIndex = 0;
        for (const actionParam of this.actionParams) {
            if (actionParam.type === ParameterType.FromRoute) {
                actualParams[actionParam.parameterIndex] = paramsValues[actionParam.parameterName];
            } else {
                actualParams[currentParamIndex] = requestBody;
            }

            currentParamIndex++;
        }

        return actualParams;
    }

    public addActionParameter(actionParameter: ActionParameter): void {
        this.actionParams.push(actionParameter);
    }

    public addAutorization(metadata: JwtAuthorizationAttributeMetadata): void {
        this.authorizedRole.push(metadata.role);
    }

    public isCurrentRoute(routes: Array<string>, verb: string): boolean {
        if (this.verb !== verb) {
            return false;
        }

        if (routes.length === 0) {
            if (this.routes[0] === '') {
                return true;
            } else {
                return false;
            }
        }

        for (let index = 0; index < this.routes.length; index++) {
            const currentRouteIndex: string = this.routes[index];
            if (currentRouteIndex[0] !== '{' && currentRouteIndex[currentRouteIndex.length - 1] !== '}') {
                if (routes[index] !== this.routes[index]) {
                    return false;
                }
            }
        }

        return true;

    }

    public isUserAuthorized(token: string): boolean {
        if (this.authorizedRole.length === 0) {
            return true;
        }

        if (token === '') {
            return false;
        }

        if (JwtHelper.verify(token)) {

            const decodeToken: any = JwtHelper.getPrincipal(token);

            if (this.authorizedRole.some((x: string) => x === decodeToken['role'])) {
                return true;
            }
        }

        return false;
    }

    private getParamsFromRoute(routes: Array<string>): Array<string> {
        const actualParams: Array<string> = new Array<string>();
        for (let index = 0; index < this.routes.length; index++) {
            const currentRouteIndex: string = this.routes[index];
            if (currentRouteIndex[0] === '{' && currentRouteIndex[currentRouteIndex.length - 1] === '}') {
                actualParams[currentRouteIndex] = routes[index];
            }
        }

        return actualParams;
    }

}