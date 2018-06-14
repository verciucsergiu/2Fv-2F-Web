import { ControllerContainerModel } from './controller-container.model';
import { DependencyContainer } from '../../../injector';
import { JwtHelper } from '../../authorization';

export class Action {
    constructor(
        private contoller: ControllerContainerModel,
        private method: any,
        private urlParams: Array<string>) {
    }

    public executeAction(token: any): any {
        const controllerInstance = DependencyContainer.get(this.contoller.contoller);
        controllerInstance.princial = JwtHelper.getPrincipal(token);
        return controllerInstance[this.method.name].apply(controllerInstance, this.urlParams);
    }
}