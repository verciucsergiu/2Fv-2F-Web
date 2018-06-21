var fr = require('../../framework/main');
var app = require('./app.config');
var MediaService = class {
    static generateGitToken(code, fk, callback, errorCallback) {
        fr.HttpClient.put(app.AppConfig.apiUri + 'api/media/github/' + code, JSON.stringify({}), callback, errorCallback);
    }
    static getTokens(tokensCallback, tokensErrorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/media', tokensCallback, tokensErrorCallback);
    }
    static getMediaData(callback, errorCallback) {
       fr.HttpClient.get(app.AppConfig.apiUri + 'api/media/data', callback, errorCallback);
    }
    static addFacebookAuthToken(token, userId, callback, errorCallback) {
        let body = JSON.stringify({ authToken: token, userId: userId });
        fr.HttpClient.put(app.AppConfig.apiUri + 'api/media/facebook', body, callback, errorCallback);
    }
}

module.exports.MediaService = MediaService;