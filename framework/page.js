(function () {
    var javascriptFiles = [];

    function defineJs(jsPath) {
        javascriptFiles.push(jsPath);
        createElement(jsPath);
    }

    function createElement(path) {
        let elem = document.createElement('script');
        elem.setAttribute('type', 'text/javascript');
        elem.setAttribute('src', 'src/' + path);
        Framework.insertAfter(elem, Framework.scriptElement);
    }

    this.defineJs = defineJs;
    this.definePage = defineJs;
})();