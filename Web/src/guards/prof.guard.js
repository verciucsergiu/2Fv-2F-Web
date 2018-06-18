var g = require('../../framework/main');
var services = require('./../services');

var ProfGuard = class extends g.Guard {
    canEnter() {
        return services.AuthService.isLoggedIn() && services.AuthService.getUserRole() === 'prof';
    }
}

module.exports.ProfGuard = ProfGuard;