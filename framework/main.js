(function () {
    var scriptElementId = 'sdmf-script-element';
    var scriptElement = document.getElementById(scriptElementId);
    
    var styleElementId = 'sdmf-style-element';
    var styleElement = document.getElementById(styleElementId);
    
    var pageViewElementId = 'sdmf-view-element';

    if (!styleElement) {
        throw 'Framework error: Style element is missing from index.html.\n' +
        'Please add <style id="sdmf-style-element"></style> to the head of the page.';
    }

    function init() {
        setPageViewElement();
    }

    function handleError(error) {
        viewPort = document.getElementsByTagName('body')[0];
        viewPort.innerHTML = 
            '<div class="framework-error">' + error + '</div>';
    }

    function insertAfter(newElement, targetElement) {
        let parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    function setAppTitle(title) {
        let currentTitle = document.getElementsByTagName('title');
        if (!currentTitle) {
            let elem = document.createElement('title');
            insertAfter(elem, scriptElement);
            currentTitle = elem;
        }
        currentTitle[0].innerHTML = title;
    }

    function readTextFile(file) {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.open("GET", file, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                let response = '';
                tryParse(xmlHttp.responseText, callback);
            } else if (xmlHttp.status > 300) {
                tryParse(xmlHttp.responseText, error);
            }
        }
        xmlHttp.open('GET', theUrl, true); 
        xmlHttp.send(null);
    }

    function tryParse(text, callback) {
        let result;
        try {
            result = JSON.parse(text);
        } catch (err) {
            result = text;
        } finally {
            callback(result);
        }
    }

    function setPageViewElement() {
        let elem = document.getElementById(pageViewElementId);
        if(!elem) {
            throw 'Framework error: Page viewport is missing from index.html.\n' +
            'Please add <div id="sdmf-view-element"></div> in the body of the index.html';
            return;
        }
        Object.defineProperty(this.framework, 'pageViewElement', { value: elem });
    }

    function setFrameworkProperties() {
        Object.defineProperty(this.framework, 'scriptElementId', { value: scriptElementId });
        Object.defineProperty(this.framework, 'scriptElement', { value: scriptElement });
        Object.defineProperty(this.framework, 'pageViewElementId', { value: pageViewElementId });
        Object.defineProperty(this.framework, 'styleElementId', { value: styleElementId });
        Object.defineProperty(this.framework, 'styleElement', { value: styleElement });
        
        Object.defineProperty(this.framework, 'init', { value: init });
        Object.defineProperty(this.framework, 'setAppTitle', { value: setAppTitle });
        Object.defineProperty(this.framework, 'insertAfterElement', { value: insertAfter });
        Object.defineProperty(this.framework, 'readTextFile', { value: readTextFile });
        Object.defineProperty(this.framework, 'httpGetAsync', { value: httpGetAsync });
        Object.defineProperty(this.framework, 'tryParse', { value: tryParse });
        Object.defineProperty(this.framework, 'printError', { value: handleError });
    }

    this.framework = function () {};
    setFrameworkProperties();
})();