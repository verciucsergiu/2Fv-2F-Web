
var fr = require('../../framework/main');
var app = require('./app.config');
var InvitationService = class {
    static lookup(id, callback, errorcallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/invitations/uids/' + id, callback, errorcallback);
    }
}

module.exports.InvitationService = InvitationService;