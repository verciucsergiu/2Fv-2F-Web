(function () {
    var routes = {};
    var events = [];
    var currnetRoute = null;
    var pageViewPort = null;
    var styleElement = framework.styleElement;
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
            framework.printError('Route: ' + path + ' doesn\'t have a template');
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
            onRefresh: listeners.push.bind(listeners)
        };

    }

    function forEachEventElement(fnName) {
        for (var i = 0, len = events.length; i < len; i++) {
            var els = pageViewPort.querySelectorAll(events[i][0]);
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

        pageViewPort = pageViewPort || document.getElementById(framework.pageViewElementId);
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
            let ctrl;
            if (parameterRouteValue) {
                ctrl = new route.controller(parameterRouteValue);
            } else {
                ctrl = new route.controller();
            }

            if (currnetRoute != route) {
                if (currnetRoute) {
                    let currnetRouteControler = new currnetRoute.controller();
                    if (currnetRouteControler.$onLeave) {
                        currnetRouteControler.$onLeave();
                    }
                }
                currnetRoute = route;
            }
            
            if (!pageViewPort || !styleElement || !route.templateUrl) {
                return;
            }



            route.onRefresh(function () {
                removeEventListeners();

                pageViewPort.innerHTML = tmpl(route.templateUrl, ctrl);
                addEventListeners();
            });
            if (route.styleUrl) {
                if (!route.style) {
                    let style = framework.readTextFile(route.styleUrl);
                    route.style = style;
                }
                styleElement.innerHTML = route.style;
            }
            if (ctrl.$onInit) {
                ctrl.$onInit();
            }
            ctrl.$refresh();
        }
    }

    function navigate(path, parameter) {
        if (path.indexOf('/') != 0) {
            path = '/' + path;
        }
        if (parameter) {
            path = path + '/' + parameter;
        }
        location.hash = '#' + path;
    }

    this.addEventListener('hashchange', router);

    this.addEventListener('load', router);

    this.route = route;
    this.navigate = navigate;
})();

