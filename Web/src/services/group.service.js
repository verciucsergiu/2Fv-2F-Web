var GroupService = class {
    static getGroup(idGroup, callback, errorCallback) {
        HttpClient.get('http://localhost:4200/api/groups/' + idGroup, null, callback, errorCallback);
    }
}
