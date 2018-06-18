var g = require('../../framework/main');
var services = require('./../services');

var AdminGuard = class extends g.Guard {
    canEnter() {
        return services.AuthService.isLoggedIn() && services.AuthService.getUserRole() === 'admin';
    }
}
module.exports.AdminGuard = AdminGuard;