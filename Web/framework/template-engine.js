var fr = require('./main');

var TemplateEngine = class  {
    constructor() {
        this.cache = {}
    }

    interpret (str, data)  {
        var fn = str[0] == '.' && str[1] == '/' ?
            this.cache[str] = this.cache[str] ||
            this.interpret(fr.Framework.readTextFile(str))
            :
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                "with(obj){p.push('" +

                // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<?").join("\t")
                    .replace(/((^|\?>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)\?>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("?>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        return data ? fn(data) : fn;
    }
}

module.exports.TemplateEngine = TemplateEngine;