var GroupService = class {
    static getGroup(idGroup, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/groups/' + idGroup, null, callback, errorCallback);
    }

    static addGroupToProfessor(idGroup, idProfessor, callback, errorCallback) {
        let body = "{}";
        HttpClient.post('http://localhost:4200/api/groups/assign/' + idGroup + '/' + idProfessor, body, callback, errorCallback);
    }

    static getAllGroups() {
        return ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    }
}
