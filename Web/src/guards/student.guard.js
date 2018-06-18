var g = require('../../framework/main');
var services = require('./../services');
var StudentGuard = class extends g.Guard {
    canEnter() {
        return services.AuthService.isLoggedIn() && services.AuthService.getUserRole() === 'student';
    }
}

module.exports.StudentGuard = StudentGuard;