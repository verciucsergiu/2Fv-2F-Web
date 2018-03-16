(function () {
    var routes = {};
    var events = [];
    var el = null;
    var ctx = {
        on: function (selector, evt, handler) {
            events.push([selector, evt, handler]);
        },
        refresh: function (listeners) {
            listeners.forEach(function (fn) { fn(); });
        }
    };
    function route(path, templateId, controller) {
        if (typeof templateId === 'function') {
            controller = templateId;
            templateId = null;
        }
        var listeners = [];
        Object.defineProperty(controller.prototype, '$on', { value: ctx.on });
        Object.defineProperty(controller.prototype, '$refresh', { value: ctx.refresh.bind(undefined, listeners) });

        // Remove parmater from the route
        if (path.indexOf('/:') != -1) {
            path = path.slice(0, path.indexOf('/:'));
        }

        routes[path] = { templateId: templateId, controller: controller, onRefresh: listeners.push.bind(listeners) };
        
    }

    function forEachEventElement(fnName) {
        for (var i = 0, len = events.length; i < len; i++) {
            var els = el.querySelectorAll(events[i][0]);
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
        el = el || document.getElementById('view');
        removeEventListeners();
        events = [];
        let url = location.hash.slice(1) || '/';
        
        let parameterRouteValue = null, paramIndex = url.lastIndexOf('/');
        if(paramIndex != 0) {
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
            if (!el || !route.templateId) {
                return;
            }
            
            route.onRefresh(function () {
                removeEventListeners();
                
                el.innerHTML = tmpl(route.templateId, ctrl);
                addEventListeners();
            });
            
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