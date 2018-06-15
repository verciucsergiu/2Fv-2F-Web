var StaticFileHandler = class {
    static createScriptElement(path) {
        let elem = document.createElement('script');
        elem.setAttribute('type', 'text/javascript');
        elem.setAttribute('src', 'src/' + path);
        Framework.insertAfter(elem, Framework.scriptElement);
    }
}

var Framework = class {

    static get scriptElementId() {
        return 'sdmf-script-element';
    }

    static get styleElementId() {
        return 'sdmf-style-element';
    }

    static get pageViewElementId() {
        return 'sdmf-view-element';
    }

    static get scriptElement() {
        return this._scriptElement;
    }

    static get styleElement() {
        return this._styleElement;
    }

    static get pageViewElement() {
        return this._pageViewElement;
    }

    static get bindSelector() {
        return '[data-bind]';
    }

    static get bindAttribute() {
        return 'data-bind';
    }

    static get typeableElementTypes() {
        return [ 'text', 'textarea', 'password'];
    }

    static init() {
        this.setDefaultElements();
    }

    static printError(error) {
        let viewPort = document.getElementsByTagName('body')[0];
        viewPort.innerHTML =
            '<div class="framework-error">' + error + '</div>';
    }

    static insertAfter(newElement, targetElement) {
        let parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    static setAppTitle(title) {
        let currentTitle = document.getElementsByTagName('title');
        if (!currentTitle) {
            let elem = document.createElement('title');
            insertAfter(elem, this.scriptElement);
            currentTitle = elem;
        }
        currentTitle[0].innerHTML = title;
    }

    static readTextFile(file) {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.open("GET", file, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    static tryParse(text) {
        let result;
        try {
            result = JSON.parse(text);
        } catch (err) {
            result = text;
        } finally {
            return result;
        }
    }

    static setDefaultElements() {
        let elem = document.getElementById('sdmf-view-element');
        if (!elem) {
            throw 'Framework error: Page viewport is missing from index.html.\n' +
            'Please add <div id="sdmf-view-element"></div> in the body of the index.html';
            return;
        }
        this._pageViewElement = elem;

        this._scriptElement =  document.getElementById('sdmf-script-element');

        this._styleElement = document.getElementById('sdmf-style-element');

        if (!this._styleElement) {
            throw 'Framework error: Style element is missing from index.html.\n' +
            'Please add <style id="sdmf-style-element"></style> to the head of the page.';
        }
    }

    static defineApp(module) {
        if (Array.isArray(module['services'])) {
            for(let page of module['services']) {
                StaticFileHandler.createScriptElement(page);
            }
        }
        if (Array.isArray(module['guards'])) {
            for(let page of module['guards']) {
                StaticFileHandler.createScriptElement(page);
            }
        }
        if (Array.isArray(module['files'])) {
            for(let page of module['files']) {
                StaticFileHandler.createScriptElement(page);
            }
        }

        // pages need to be last no matter what
        if (Array.isArray(module['pages'])) {
            for(let page of module['pages']) {
                StaticFileHandler.createScriptElement(page);
            }
        }
    }
}

var HttpResponse = class {
    constructor(response) {
        this.statusCode = response.status;
        this.rawText = response.responseText;
    }

    get body() {
        return Framework.tryParse(this.rawText);
    }
}

var HttpHeader = class {
    constructor(contentType) {
        this.contentType = contentType;
    }
}

var HttpClient = class {

    static get(req, callback, error) {
        this.request(req, 'get', null, null, callback, error);
    }

    static post(req, body, callback, error) {
        this.request(req, 'post', body, null, callback, error);
    }

    static put(req, body, callback, error) {
        this.request(req, 'put', body, null, callback, error);
    }

    static patch(req, body, callback, error) {
        this.request(req, 'patch', body, null, callback, error);
    }

    static delete(req, body, callback, error) {
        this.request(req, 'delete', body, null, callback, error);
    }

    static options(req, body, callback, error) {
        this.request(req, 'options', body, null, callback, error);
    }

    static request (req, requestVerb, body, headers, callback, error) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status >= 400) {
                    if(error) {
                        error(new HttpResponse(xmlHttp));
                    }
                } else {

                    if (callback) {
                        callback(new HttpResponse(xmlHttp));
                    }
                }
            }
        }

        xmlHttp.onerror = () => {
            if(error) {
                error(new HttpResponse(xmlHttp));
            }
        }

        xmlHttp.open(requestVerb, req, true);
        const token = localStorage.getItem('userToken');
        if(token) {
            xmlHttp.setRequestHeader('authorization', token);
        }
        xmlHttp.send(body);
    }
}

var Guard = class {
    canEnter() {
        return true;
    }
}
