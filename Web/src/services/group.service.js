var fr = require('../../framework/main');
var app = require('./app.config');
var GroupService = class {
    static getGroup(idGroup, callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/groups/' + idGroup, callback, errorCallback);
    }

    static getAllGroups(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/groups/', callback, errorCallback);
    }

    static addGroup(group, callback, errorCallback) {
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/groups/', JSON.stringify(group), callback, errorCallback);
    }
}

module.exports.GroupService = GroupService;