var fr = require('../../framework/main');
var app = require('./app.config');
var MediaService = class {
    static generateGitToken(code, fk, callback, errorCallback) {
        fr.HttpClient.put(app.AppConfig.apiUri + 'api/media/github/' + code, JSON.stringify({}), callback, errorCallback);
    }
    static getTokens(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/media', callback, errorCallback);
    }
    static getMediaData(callback, errorCallback) {
       fr.HttpClient.get(app.AppConfig.apiUri + 'api/media/data', callback, errorCallback);
    }
}

module.exports.MediaService = MediaService;