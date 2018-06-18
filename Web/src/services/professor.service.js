var fr = require('../../framework/main');
var app = require('./app.config');
var models = require('../models/index');

var ProfessorService = class {
    static getProfessor(idProfessor, callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/professors/' + idProfessor, callback, errorCallback);
    }

    static getAllProfessors(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/professors/all', callback, errorCallback);
    }

    static addGroupToProfessor(idGroup, idProfessor, callback, errorCallback) {
        let body = JSON.stringify({ "groupId": idGroup });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    static removeGroupFromProfessor(idGroup, idProfessor, callback, errorCallback) {
        let body = JSON.stringify({ "groupId": idGroup });
        fr.HttpClient.delete(app.AppConfig.apiUri + 'api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    static inviteProfessor(email, callback, errorCallback) {
        let body = JSON.stringify({ "email": email });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/invitations/invite', body, callback, errorCallback);
    }

    //return a ProfessorModel from object
    static parseProfessor(professor) {
        return new models.ProfessorModel(
            professor.groups,
            professor.firstName,
            professor.lastName,
            professor.email,
            professor.rank,
            professor.id
        )
    }

    static groupsAsString(groups) {
        this.result = "";
        for (let group of groups) {
            this.result = this.result + group.name + ' ';
        }
        return this.result;
    }
}

module.exports.ProfessorService = ProfessorService;