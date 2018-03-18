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
}

var HttpResponse = class {
    constructor(resonse) {
        this.statusCode = resonse.status;
        this.rawText = response.responseText;
    }

    get messageAsObject() {
        return Framework.tryParse(this.rawText);
    }
}

var HttpHeader = class {
    constructor(contentType) {
        this.contentType = contentType;
    }
}

var HttpClient = class {

    static get(request, callback, error) {
       request(request, 'get', null, null, callback, error);
    }

    static post(request, body, callback, error) {
        request(request, 'post', body, null, callback, error);
    }

    static put(request, body, callback, error) {
        request(request, 'put', body, null, callback, error);
    }

    static delete(request, body, callback, error) {
        request(request, 'delete', body, null, callback, error);
    }

    static options(request, body, callback, error) {
        request(request, 'options', body, null, callback, error);
    }

    request(req, requestVerb, body, headers, callback, error) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                callback(new HttpResponse(xmlhttp));
            }
        }

        xmlHttp.onerror = () => {
            error(new HttpResponse(xmlHttp));
        }

        xmlHttp.open(requestVerb, req, true);
        xmlHttp.send(body);
    }
}

var Guard = class {
    canEnter() {
        return true;
    }
}