var GroupService = class {
    static getGroup(idGroup, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/groups/' + idGroup, null, callback, errorCallback);
    }

    static addGroupToProfessor(idGroup, idProfessor, callback, errorCallback) {
        let body = JSON.stringify({ "groupId": idGroup });
        HttpClient.post('http://localhost:4200/api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    static removeGroupFromProfessor(idGroup,idProfessor,callback,errorCallback){
        let body = JSON.stringify({ "groupId": idGroup });
        HttpClient.delete('http://localhost:4200/api/professors/' + idProfessor + '/groups', body, callback, errorCallback);
    }

    static getAllGroups() {
        return ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    }
}
