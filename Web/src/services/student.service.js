var StudentService = class {
    static getStudentsFromGroup(group, callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/students/groups/' + group, callback, errorCallback);
    }
    static getStudents(callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/students/', callback, errorCallback);
    }

    static addStudent(student, callback, errorCallback) {
        HttpClient.post(AppConfig.apiUri + 'api/students/', JSON.stringify(student), callback, errorCallback);
    }

    static getStudentDetails(callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/students/details', callback, errorCallback);
    }
    static getGitStatus(callback, errorCallback) {
        HttpClient.get(AppConfig.apiUri + 'api/students/git', callback, errorCallback);
    }

    static updateAttendance(uid, attendance, callback, errorCallback) {
        let body = JSON.stringify(attendance);
        HttpClient.put(AppConfig.apiUri + 'api/attendance-comments/' + uid, body, callback, errorCallback);
    }

    static addToken(token, callback, errorCallback) {
        let body = JSON.stringify({ token: token });
        HttpClient.post(AppConfig.apiUri + 'api/students/git', body, callback, errorCallback);
    }
}