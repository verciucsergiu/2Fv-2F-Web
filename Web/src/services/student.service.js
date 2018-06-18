var fr = require('../../framework/main');
var app = require('./app.config');
var StudentService = class {
    static getStudentsFromGroup(group, callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/students/groups/' + group, callback, errorCallback);
    }
    static getStudents(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/students/', callback, errorCallback);
    }

    static addStudent(student, callback, errorCallback) {
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/students/', JSON.stringify(student), callback, errorCallback);
    }

    static getStudentDetails(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/students/details', callback, errorCallback);
    }
    static getGitStatus(callback, errorCallback) {
        fr.HttpClient.get(app.AppConfig.apiUri + 'api/students/git', callback, errorCallback);
    }

    static updateAttendance(uid, attendance, callback, errorCallback) {
        let body = JSON.stringify(attendance);
        fr.HttpClient.put(app.AppConfig.apiUri + 'api/attendance-comments/' + uid, body, callback, errorCallback);
    }

    static addToken(token, callback, errorCallback) {
        let body = JSON.stringify({ token: token });
        fr.HttpClient.post(app.AppConfig.apiUri + 'api/students/git', body, callback, errorCallback);
    }
}

module.exports.StudentService = StudentService;