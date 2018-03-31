var connect = require('connect');
var serveStatic = require('serve-static');
connect()
    .use(serveStatic(__dirname)).listen(3000, function () {
        console.log('Server running on 3000...\nYou can now acces the site from http://localhost:3000');
    });