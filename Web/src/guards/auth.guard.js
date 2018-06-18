var g = require('../../framework/main');
var services = require('./../services');

var AuthGuard = class extends g.Guard {
    canEnter() {
        return !services.AuthService.isLoggedIn();
    }
}

module.exports.AuthGuard = AuthGuard;