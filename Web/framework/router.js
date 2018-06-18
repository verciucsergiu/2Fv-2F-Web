var tl = require('./template-engine');
var fr = require('./main');

var BindHandler = class {
    constructor() {
        this.currentContext = null;
        this.elements = null;
    }

    static bindElementsWithContext(context) {
        this.currentContext = context;
        this.elements = document.querySelectorAll(fr.Framework.bindSelector);
        this.elements.forEach((element) => {
            var propToBind = element.getAttribute(fr.Framework.bindAttribute);
            if (this.isElementTypeable(element)) {
                this.addPropertySetAndGetOnContext(propToBind, this.elements);
                if (context[propToBind] !== undefined) {
                    element.onkeyup = () => {
                        context[propToBind] = element.value;
                    }
                    element.onkeydown = (keyElement) => {
                        if (keyElement.key == 'Tab') {
                            context[propToBind] = element.value;
                        }
                    }
                }
            }
        });
    }

    static addPropertySetAndGetOnContext(prop, elems) {
        var propertyInitValue = null;
        if (this.currentContext.hasOwnProperty(prop)) {
            propertyInitValue = this.currentContext[prop];
        }
        var value;
        Object.defineProperty(this.currentContext, prop, {
            set: function (newValue) {
                value = newValue;
                elems.forEach(function (element) {
                    if (element.getAttribute(fr.Framework.bindAttribute) === prop) {
                        if (element.type && BindHandler.isElementTypeable(element)) {
                            element.value = newValue;
                        }
                        else if (!element.type) {
                            element.innerHTML = newValue;
                        }
                    }
                });
            },
            get: function () {
                return value;
            },
            enumerable: true,
            configurable: true
        });

        this.currentContext[prop] = propertyInitValue;
    }

    static isElementTypeable(element) {
        return fr.Framework.typeableElementTypes.find(() => element.type);
    }
};

var Router = class {
    static navigate(path, parameter) {
        if (path.indexOf('/') != 0) {
            path = '/' + path;
        }
        if (parameter) {
            path = path + '/' + parameter;
        }
        location.hash = '#' + path;
    }
};

var RT = class {
   

    static route (path, page, controller) {
        if (!page.templateUrl && !page.template === undefined) {
            fr.Framework.printError('Route: ' + path + ' doesn\'t have a template');
            return;
        }

        let listeners = [];
        Object.defineProperty(controller.prototype, '$on', { value: RT.context.on });
        Object.defineProperty(controller.prototype, '$refresh', { value: RT.context.refresh.bind(undefined, listeners) });

        // Remove parmater from the route
        if (path.indexOf('/:') != -1) {
            path = path.slice(0, path.indexOf('/:'));
        }

        RT.routes[path] = {
            templateUrl: page.templateUrl,
            styleUrl: page.styleUrl,
            style: page.style,
            controller: controller,
            onRefresh: listeners.push.bind(listeners),
            guard: page.guard
        };

    }

    static forEachEventElement(fnName) {
        for (var i = 0, len = RT.events.length; i < len; i++) {
            var els = fr.Framework.pageViewElement.querySelectorAll(RT.events[i][0]);
            for (var j = 0, elsLen = els.length; j < elsLen; j++) {
                els[j][fnName].apply(els[j], RT.events[i].slice(1));
            }
        }
    }

    static addEventListeners() {
        RT.forEachEventElement('addEventListener');
    }

    static removeEventListeners() {
        RT.forEachEventElement('removeEventListener');
    }

    static router() {
        RT.removeEventListeners();
        RT.events = [];
        let url = location.hash.slice(1) || '/';

        let parameterRouteValue = null, paramIndex = url.lastIndexOf('/');
        if (paramIndex != 0) {
            parameterRouteValue = url.slice(paramIndex + 1);
            url = url.slice(0, paramIndex);
        }

        let route = RT.routes[url] || RT.routes['*'];
        if (route && route.controller) {
            RT.checkGuard(route);

            let ctrl;
            if (parameterRouteValue) {
                ctrl = new route.controller(parameterRouteValue);
            } else {
                ctrl = new route.controller();
            }

            if (RT.currentRoute != route) {
                if (RT.currentRoute) {
                    try {
                        let currentRouteControler = new currentRoute.controller();
                        if (currentRouteControler.$onLeave) {
                            currentRouteControler.$onLeave();
                        }
                    } catch (error) {
                        
                    }
                }

                RT.currentRoute = route;
            }

            if (!route.templateUrl) {
                return;
            }

            route.onRefresh(function () {
                RT.removeEventListeners();

                fr.Framework.pageViewElement.innerHTML = RT.templateEngine.interpret(route.templateUrl, ctrl);
                BindHandler.bindElementsWithContext(ctrl);
                RT.addEventListeners();
            });

            if (route.styleUrl) {
                if (!route.style) {
                    let style = fr.Framework.readTextFile(route.styleUrl);
                    route.style = style;
                }

                fr.Framework.styleElement.innerHTML = route.style;
            }
            if (ctrl.$onInit) {
                ctrl.$onInit();
            }
            ctrl.$refresh();
        }
    }

    static checkGuard(route) {
        if (route.hasOwnProperty('guard') && route.guard) {
            if (route.guard.hasOwnProperty('canEnter') && Array.isArray(route.guard.canEnter)) {
                let guards = route.guard.canEnter;
                let canEnter = true;
                for(let guard of guards) {
                    let guardInstance = new guard();
                    if (!guardInstance instanceof fr.Guard) {
                        canEnter = false;
                        fr.Framework.printError("Guard :'" + guardInstance.constructor.name + "' doesn't extends Guard class!");
                    }
                    if (!guardInstance.hasOwnProperty('canEnter') && typeof guardInstance.canEnter != 'function') {
                        fr.Framework.printError("Guard :'" + guardInstance.constructor.name + "' doesn't have a function called 'canEnter'!");
                        canEnter = false;
                        break;
                    } else {
                        canEnter = guardInstance.canEnter();
                        if (!canEnter) {
                            break;
                        }
                    }
                }
                
                if (!canEnter) {
                    if (route.guard.redirectTo) {
                        Router.navigate(route.guard.redirectTo);
                    } else {
                        route = route['*'];
                    }
                }
            } else {
                fr.Framework.printError("A route has a guard but property: 'canEnter' is undefined or is not an array!");
            }
        }
    }
};


(() => {
    RT.routes = {};
    RT.events = [];
    RT.currentRoute = {};
    RT.listeners = [];
    RT.templateEngine = new tl.TemplateEngine();
    RT.context = {
        on: function (selector, evt, handler) {
            RT.events.push([selector, evt, handler]);
        },
        refresh: function (listeners) {
            listeners.forEach(function (fn) { fn(); });
        }
    };
    addEventListener('hashchange', RT.router);
    
    addEventListener('load', RT.router);
})();
module.exports.BindHandler = BindHandler;
module.exports.Router = Router;
module.exports.route = RT.route;