(function () {
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
        xmlHttp.open('GET', theUrl, true); // true for asynchronous 
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

    this.readTextFile = readTextFile;
    this.tryParse = tryParse;
    this.httpGetAsync = httpGetAsync;
})();