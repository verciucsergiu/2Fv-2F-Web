"use strict";
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let response = "";
            tryParse(xmlHttp.responseText, callback);
        } else if (xmlHttp.status > 300 ) {
            tryParse(xmlHttp.responseText, error);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function tryParse(text, callback) {
    let result;
    try {
        result = JSON.parse(text);
    } catch(err) {
        result = text;
    } finally {
        callback(result);
    }
}

route('/', 'home', function () { });

route('/page1', 'page1', function () {
    this.counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;
    this.heading = "dynamic title";
    this.$on('#counter', 'click', function () {
        this.counter = this.counter + 1;
        localStorage.setItem('counter', this.counter);
        navigate('page2', 'test');
        this.$refresh();
    }.bind(this));
    this.$on('#refresh', 'click', function () {
        localStorage.clear();
        this.counter = 0;
        this.$refresh();
    }.bind(this));
 });

 route('/page2/:id', 'page2', function (id)  {
    this.id = id;
    
});