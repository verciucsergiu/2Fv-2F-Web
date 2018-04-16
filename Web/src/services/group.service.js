var GroupService = class {
    static getGroupsOfProfessor(idProfessor, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/groups/' + idProfessor, null, callback, errorCallback);
    }
}
