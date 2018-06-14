import { DecoratorHandler } from "../decorators/decorators-handler";
import { AppContainer } from "../app-container/app-container";
import { JwtAuthorizationAttributeMetadata } from "./jwt-authorization-attribute.metadata";

export function Authorize(metadata: JwtAuthorizationAttributeMetadata) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addAuthorizationToControllerMethod(
                target.constructor.name,
                propertyKey,
                metadata);
        });
    };
}