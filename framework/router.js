var BindHandler = class {
    constructor() {
        this.currentContext = null;
        this.elements = null;
    }

    static bindElementsWithContext(context) {
        this.currentContext = context;
        this.elements = document.querySelectorAll(Framework.bindSelector);
        this.elements.forEach((element) => {
            var propToBind = element.getAttribute(Framework.bindAttribute);
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
                    if (element.getAttribute(Framework.bindAttribute) === prop) {
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
        return Framework.typeableElementTypes.find(() => element.type);
    }
};

(() => {
    var routes = {};
    var events = [];
    var currentRoute = null;
    
    var context = {
        on: function (selector, evt, handler) {
            events.push([selector, evt, handler]);
        },
        refresh: function (listeners) {
            listeners.forEach(function (fn) { fn(); });
        }
    };

    function route(path, page, controller) {
        if (!page.templateUrl) {
            Framework.printError('Route: ' + path + ' doesn\'t have a template');
            return;
        }

        var listeners = [];
        Object.defineProperty(controller.prototype, '$on', { value: context.on });
        Object.defineProperty(controller.prototype, '$refresh', { value: context.refresh.bind(undefined, listeners) });

        // Remove parmater from the route
        if (path.indexOf('/:') != -1) {
            path = path.slice(0, path.indexOf('/:'));
        }

        routes[path] = {
            templateUrl: page.templateUrl,
            styleUrl: page.styleUrl,
            style: page.style,
            controller: controller,
            onRefresh: listeners.push.bind(listeners),
            guard: page.guard
        };

    }

    function forEachEventElement(fnName) {
        for (var i = 0, len = events.length; i < len; i++) {
            var els = Framework.pageViewElement.querySelectorAll(events[i][0]);
            for (var j = 0, elsLen = els.length; j < elsLen; j++) {
                els[j][fnName].apply(els[j], events[i].slice(1));
            }
        }
    }

    function addEventListeners() {
        forEachEventElement('addEventListener');
    }

    function removeEventListeners() {
        forEachEventElement('removeEventListener');
    }

    function router() {
        removeEventListeners();
        events = [];
        let url = location.hash.slice(1) || '/';

        let parameterRouteValue = null, paramIndex = url.lastIndexOf('/');
        if (paramIndex != 0) {
            parameterRouteValue = url.slice(paramIndex + 1);
            url = url.slice(0, paramIndex);
        }

        let route = routes[url] || routes['*'];
        if (route && route.controller) {
            checkGuard(route);

            let ctrl;
            if (parameterRouteValue) {
                ctrl = new route.controller(parameterRouteValue);
            } else {
                ctrl = new route.controller();
            }

            if (currentRoute != route) {
                if (currentRoute) {
                    let currentRouteControler = new currentRoute.controller();
                    if (currentRouteControler.$onLeave) {
                        currentRouteControler.$onLeave();
                    }
                }

                currentRoute = route;
            }

            if (!route.templateUrl) {
                return;
            }

            route.onRefresh(function () {
                removeEventListeners();

                Framework.pageViewElement.innerHTML = tmpl(route.templateUrl, ctrl);
                BindHandler.bindElementsWithContext(ctrl);
                addEventListeners();
            });

            if (route.styleUrl) {
                if (!route.style) {
                    let style = Framework.readTextFile(route.styleUrl);
                    route.style = style;
                }

                Framework.styleElement.innerHTML = route.style;
            }
            if (ctrl.$onInit) {
                ctrl.$onInit();
            }
            ctrl.$refresh();
        }
    }

    function checkGuard(route) {
        if (route.hasOwnProperty('guard') && route.guard) {
            if (route.guard.hasOwnProperty('canEnter') && Array.isArray(route.guard.canEnter)) {
                let guards = route.guard.canEnter;
                let canEnter = true;
                for(let guard of guards) {
                    let guardInstance = new guard();
                    if (!guardInstance instanceof Guard) {
                        canEnter = false;
                        Framework.printError("Guard :'" + guardInstance.constructor.name + "' doesn't extends Guard class!");
                    }
                    if (!guardInstance.hasOwnProperty('canEnter') && typeof guardInstance.canEnter != 'function') {
                        Framework.printError("Guard :'" + guardInstance.constructor.name + "' doesn't have a function called 'canEnter'!");
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
                Framework.printError("A route has a guard but property: 'canEnter' is undefined or is not an array!");
            }
        }
    }


    this.addEventListener('hashchange', router);

    this.addEventListener('load', router);

    this.route = route;

    this.Router = class {
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
})();